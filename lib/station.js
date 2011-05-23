  var transcode = require('./transcode'),
    Playlist = require('./playlist');
    
  module.exports = station = function station(name, files){
    console.log(name);
    this.name = name;
    this.playlist = new Playlist(files);
    return true;
  }
  
  station.prototype.addSongs = function(songs){
    this.playlist.addSongs(songs);
  }
  
  station.prototype.play = function (req, res, next){
    console.log('playing');
    res.write('playing station');
    res.end();
  }