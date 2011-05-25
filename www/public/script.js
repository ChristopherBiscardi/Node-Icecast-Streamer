$(document).ready(function() {
  $('#createStation').click(function(){
   
alert('clicked');
    $.ajax({
     type: "POST",
     url: "/station/myStation",
     data: "name=myStation&f=create&files=~/Users/Chris/Gits/Node-Icecast-Streamer/www/01.mp3",
     success: function(msg){
       alert( "Data Saved: " + msg );
     }
   });
   //$.post("station/myStation", { name: "John", time: "2pm" } );
  })
  
  
  var audio = new Audio();
        if (audio.canPlayType('application/ogg; codecs="vorbis"') == "probably"
            && (/Chrome/i.test(navigator.userAgent) || !/Safari/i.test(navigator.userAgent))) {
          encoding = 'ogg';
        } else {
          encoding = 'mp3';
        }
        audio.src='/station/myStation.' + encoding;
        audio.setAttribute('controls', true);
        audio.setAttribute('autobuffer', false);
      $('body').append(audio);
        audio.load();
        audio.play();
      alert(encoding);
});