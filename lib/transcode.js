fs = require('fs');
  
//position = {start: 30, end: 45}
module.exports.transcode = function(file, position, encoding, req, res){
 function transcode(file/*, position*/){
   console.log('transcoding');
  //fs.createReadStream(file/*, position*/);
  var otherparams = ['-i', file, '-f', 's16le', '-acodec', 'pcm_s16le', '-ac', '2', '-ar', '44100', '-'];
  ffmpeg = spawn('ffmpeg', otherparams);
  //ffmpeg.stdout.on("data", outChunk)
  ffmpeg.on('exit', function (code) {
   console.log('ffmpeg Exit');
  });
  
  console.log('encoder');
  if(encoding === 'mp3'){
  console.log('mp3');
  
   headers = {
    "Content-Type": "audio/mpeg",
  "Connection": "close",
  "Transfer-Encoding": "identity"
  };
  res.writeHead(200, headers);
  
   mp3 = spawn("lame", [
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
    if (mp3.stdin.writable){
      mp3.stdin.write(chunk);
  }}
  ffmpeg.stdout.on("data", callback);
  clients.push(res);
      
  req.connection.on("close", function() {
  // This occurs when the HTTP client closes the connection.
  clients.splice(clients.indexOf(res), 1);
  ffmpeg.stdout.removeListener("data", callback);
    mp3.kill();
  });
  
  }
  else if(req.params.type == 'ogg'){
  console.log('oggenc');
  
  var headers = {
    "Content-Type": "application/ogg",
  "Connection": "close",
  "Transfer-Encoding": "identity"
  };
  res.writeHead(200, headers);
  
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
  
  req.connection.on("close", function() {
  // This occurs when the HTTP client closes the connection.
  clients.splice(clients.indexOf(res), 1);
  ffmpeg.stdout.removeListener("data", callback);
  ogg.kill();
  console.error((("OGG " + "Client Disconnected: "+req.connection.remoteAddress+" :(").bold + " Total " + clients.length).red);
  });
    }
    else{
      console.log('no supported format');
        }
  }//module.exports function
  }