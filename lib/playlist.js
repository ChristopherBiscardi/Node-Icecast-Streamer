var songs = [];
module.exports = function playlist(files){
    for(file in files){
      songs.push(file);
    }
    return true;
  }

module.exports.addSongs = function(files){
  for(file in files){
  songs.push(file)
  }
}
module.exports.displayPlaylist = function(){
  console.log(songs);
};