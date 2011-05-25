module.exports = function(files){
  this.songs = [];
  this.currentSong = 0;
  this.currentPosition = 0;
  console.log('construction playlist');
  console.log(files);
   /* for(file in files){
      this.songs.push(files[file]);
            console.log('files pushed' + files[file]);

    }*/
    this.songs.push(files);
    return true;
  }

module.exports.addSongs = function(files){
  for(file in files){
  this.songs.push(files[file])
  }
}
module.exports.displayPlaylist = function(){
  console.log(this.songs);
};