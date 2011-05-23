fs = require('fs');
  
//position = {start: 30, end: 45}
module.exports.transcode = function(file, position){
 function transcode(file, position){
    fs.openReadStream(file, position);
    var otherparams = ['-i', file, '-f', 's16le', '-acodec', 'pcm_s16le', '-ac', '2', '-ar', '44100', '-'];
    ffmpeg = spawn('ffmpeg', otherparams);
    //ffmpeg.stdout.on("data", outChunk)
    ffmpeg.on('exit', function (code) {
     console.log('ffmpeg Exit');
    });
    
    }
  }