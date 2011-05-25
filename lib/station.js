  var t = require('./transcode'),
    Playlist = require('./playlist');
    
  module.exports = station = function station(name, files){
    console.log(name);
    this.name = name;
    this.playlist = new Playlist(files);
    console.log('playlist=' + this.playlist[0]);
    return true;
  }
  
  station.prototype.addSongs = function(songs){
    this.playlist.addSongs(songs);
  }
  
  station.prototype.play = function (req, res, next){
    u = req.url.split('.');
    for(element in u){
      switch(u[element]){
        
        case 'mp3':
        encoder = 'mp3';
        break;
        
        case 'ogg':
        encoder = 'ogg'
        break;
        
      }
    }
    console.log(this.playlist.songs[0]);
    t.transcode(this.playlist.songs[this.playlist.currentSong], this.playlist.currentPosition, encoder, req, res)
    console.log('playing');
  }