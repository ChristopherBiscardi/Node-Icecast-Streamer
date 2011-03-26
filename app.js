
/**
 * Module dependencies.
 */

var express = require('express');
require("colors");
var fs = require("fs");
var http = require("http");
var spawn = require("child_process").spawn;
var icecast = require("icecast-stack");
var util   = require('util'),
    exec  = require('child_process').exec,
    ffmpeg,
    currentSongNo = 0,
    songList;



var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


//FFMPEG
//read music directory
songList = fs.readdirSync(__dirname + '/music');


function spawnnewffmpeg(req,res,next){
	console.log(req.params);
		console.log("current song is" + req.params.song);
		
	song = __dirname + '/music/' + req.params.song;
	console.log(song);
	var otherparams = ['-i', song, '-f', 's16le', '-acodec', 'pcm_s16le', '-ac', '2', '-ar', '44100', '-']
	ffmpeg = spawn('ffmpeg', otherparams);
	//ffmpeg.stdout.on("data", outChunk)
	      ffmpeg.on('exit', function (code) {
         console.log('ffmpeg Exit');
      });
      next();
	};
	
 
 // Stdin is expecting raw PCM data of the format:
var SAMPLE_SIZE = 16;   // 16-bit samples, Little-Endian, Signed
var CHANNELS = 2;       // 2 channels (left and right)
var SAMPLE_RATE = 44100;// 44,100 Hz sample rate.

// If we're getting raw PCM data as expected, calculate the number of bytes
// that need to be read for `1 Second` of audio data.
var BLOCK_ALIGN = SAMPLE_SIZE / 8 * CHANNELS; // Number of 'Bytes per Sample'
var BYTES_PER_SECOND = SAMPLE_RATE * BLOCK_ALIGN;

// Needed for throttling stdin.
var startTime = new Date();
var totalBytes = 0;


var name = "Node-Icecast-Streamer"
var metaint = 4096;
// Array of HttpServerResponse objects that are listening clients.
var clients = [];
// The max number of listening clients allowed at a time.
var maxClients = 15;

var currentTrack = "unknown";
var currentTrackStartTime;
var duration;
var dId;


// Routes

function encode(req,res,next){
	console.log('encoder');
	if(req.params.type == 'mp3'){
		console.log('mp3');
		 // Sorry, too busy, try again later!
    if (clients.length >= maxClients) {
      res.writeHead(503);
      return res.end("The maximum number of clients ("+maxClients+") are aleady connected, try connecting again later...")
    }

    var headers = {
      "Content-Type": "audio/mpeg",
      "Connection": "close",
      "Transfer-Encoding": "identity"
    };
  /*  if (acceptsMetadata) {
      headers['icy-name'] = name;
      headers['icy-metaint'] = metaint;
    }*/
    res.writeHead(200, headers);
    
  /*  if (acceptsMetadata) {
      res = new icecast.IcecastWriteStack(res, metaint);
      res.queueMetadata(currentTrack);
    }*/

    var mp3 = spawn("lame", [
      "-S", // Operate silently (nothing to stderr)
      "-r", // Input is raw PCM
      "-s", SAMPLE_RATE / 1000, // Input sampling rate: 44,100
      "-", // Input from stdin
      "-" // Output to stderr
    ]);
    mp3.on("exit", function(exitCode) {
      console.error("mp3.onExit: "+ exitCode);
    });
    mp3.on("error", function(error) {
      console.error("mp3.onError: ", error);
    });
    mp3.stdin.on("error", function(error) {
      console.error("mp3.stdin.onError: ", error);
    });
    mp3.stdout.on("error", function(error) {
      console.error("mp3.stdout.onError: ", error);
    });
    mp3.stdout.on("data", function(chunk) {
      res.write(chunk);
    });

    // Then start sending the incoming PCM data to the MP3 encoder
    var callback = function(chunk) {
      if (mp3.stdin.writable)
        mp3.stdin.write(chunk);
    }
    ffmpeg.stdout.on("data", callback);
    clients.push(res);
   // console.error((("New MP3 " + (acceptsMetadata ? "Icecast " : "") + "Client Connected: "+req.connection.remoteAddress+"!").bold + " Total " + clients.length).green);
    
    req.connection.on("close", function() {
      // This occurs when the HTTP client closes the connection.
      clients.splice(clients.indexOf(res), 1);
      ffmpeg.stdout.removeListener("data", callback);
      mp3.kill();
    //  console.error((("MP3 " + (acceptsMetadata ? "Icecast " : "") + "Client Disconnected: "+req.connection.remoteAddress+" :(").bold + " Total " + clients.length).red);
    });

		}
		else if(req.params.type == 'ogg'){
			console.log('oggenc');
			 // Sorry, too busy, try again later!
    if (clients.length >= maxClients) {
      res.writeHead(503);
      return res.end("The maximum number of clients ("+maxClients+") are aleady connected, try connecting again later...")
    }

    var headers = {
      "Content-Type": "application/ogg",
      "Connection": "close",
      "Transfer-Encoding": "identity"
    };
 /*   if (acceptsMetadata) {
      headers['icy-name'] = name;
      headers['icy-metaint'] = metaint;
    }*/
    res.writeHead(200, headers);
    
   /* if (acceptsMetadata) {
      res = new icecast.IcecastWriteStack(res, metaint);
      res.queueMetadata(currentTrack);
    }*/

    var ogg = spawn("oggenc", [
      "--silent", // Operate silently (nothing to stderr)
      "-r", // Raw input
      "--ignorelength", // Ignore length
      "--raw-rate=" + SAMPLE_RATE, // Raw input rate: 44100
      "-" // Input from stdin, Output to stderr
    ]);
    ogg.on("exit", function(exitCode) {
      console.error("ogg.onExit: "+ exitCode);
    });
    ogg.on("error", function(error) {
      console.error(error);
    });
    ogg.stdin.on("error", function(error) {
      console.error("ogg.stdin.onError: ", error);
    });
    ogg.stdout.on("error", function(error) {
      console.error("ogg.stdout.onError: ", error);
    });
    ogg.stdout.on("data", function(chunk) {
      res.write(chunk);
    });

    // Then start sending the incoming PCM data to the OGG encoder
    var callback = function(chunk) {
      if (ogg.stdin.writable)
        ogg.stdin.write(chunk);
    }
    ffmpeg.stdout.on("data", callback);
    clients.push(res);
   // console.error((("New OGG " + (acceptsMetadata ? "Icecast " : "") + "Client Connected: "+req.connection.remoteAddress+"!").bold + " Total " + clients.length).green);

    req.connection.on("close", function() {
      // This occurs when the HTTP client closes the connection.
      clients.splice(clients.indexOf(res), 1);
      ffmpeg.stdout.removeListener("data", callback);
      ogg.kill();
     // console.error((("OGG " + (acceptsMetadata ? "Icecast " : "") + "Client Disconnected: "+req.connection.remoteAddress+" :(").bold + " Total " + clients.length).red);
    });
			}
			else{
				console.log('no supported format');
				}
	}

app.get('/', function(req, res){
  res.render('index', {
    title: 'Mediabox'
  });
});
app.all('/music/:type/:song', spawnnewffmpeg, encode, function(req,res,next) {

	});
app.all('/playlist', function(req, res){
	res.render('playlist', {
		layout: false,
		songs: songList
		});
	});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
}

//mediatags = [{"ID3v2":{"TALB":"Promo Only Mainstream Radio September 2008","TRCK":"6","TPE1":"Katy Perry","TCON":"12","PRIV":["PCDJ GAIN","PCDJ RATING","PCDJ CD CODE"],"TIT2":"Hot N Cold"},"ID3v1":{"Title":"Hot N Cold [PO Clean Edit]","Artist":"Katy Perry","Album":"Promo Only Mainstream Radio Se","Comment":"","Genre":"Other","Year":0,"Track":6},"fullpath":"/mnt/data/Music/Shared/Katy Perry/One of the Boys/Katy Perry - Hot N Cold [PO Clean Edit].mp3"},{"Â©nam":"Grapevine Fires","Â©ART":"Death Cab For Cutie","Â©wrt":"Benjamin Gibbard","Â©alb":"Narrow Stairs","Â©gen":"Alternative & Punk","trkn":"7 of 11","disk":"1 of 1","Â©day":"2008","cpil":"false","pgap":"0","tmpo":"0","Â©too":"iTunes 8.2.1, QuickTime 7.6.2","----[iTunSMPB]":"00000000 00000840 00000304 0000000000A8B8BC 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000","----[EncodingParams]":"hex 0x76657273 00000001 61636266 00000002 62726174 0003E800 73726371 0000007F\n \t\t\t63646376 00010606 ","----[iTunNORM]":"00000806 000009E7 000032DC 00003FAF 00033FC6 00027516 00008000 00008000 00002321 00007D55","----[iTunes_CDDB_IDs]":"11+C99902453154605CDFC831DEB6D68737+11240120","----[UFIDhttp://www.cddb.com/id3/taginfo1.html]":"3CD3N29Q159277411U26872617EBF956F428FCFDACD28940993EDP1","fullpath":"/mnt/data/Music/AJ's Music/Death Cab For Cutie/Narrow Stairs/07 Grapevine Fires.m4a"}];