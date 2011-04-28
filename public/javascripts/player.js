$(document).ready(function() {

		var encoding = "";
		
		var songList = [];
		var currentSong = 0;


		
	$.ajax({
  url: '/playlist',
  success: function(result){
    $('#playlist ul').html(result);
    $('#playlist ul li').each(function(i){
    	songList.push($(this).attr('rel'));
  });
 		
		
        var audio = new Audio();
        if (audio.canPlayType('application/ogg; codecs="vorbis"') == "probably"
            && (/Chrome/i.test(navigator.userAgent) || !/Safari/i.test(navigator.userAgent))) {
          encoding = 'ogg';
        } else {
          encoding = 'mp3';
        }
        audio.src='/music/' + encoding + '/' + songList[0];
        audio.setAttribute('controls', true);
        audio.setAttribute('autobuffer', false);
			$('#thePlayer').append(audio);
        audio.load();
        audio.play();
      alert(encoding);

	
 }
});



 $('#playlist ul li').live('click', function(){
   	$('audio').detach();
   	  var audio2 = new Audio();
   	  audio2.src='/music/' + encoding + '/' + $(this).attr('rel');
        audio2.setAttribute('controls', true);
        audio2.setAttribute('autobuffer', false);
			$('#thePlayer').append(audio2);
        audio2.load();
        audio2.play();

for(var i in songList)
{
	//alert(songList[i]);
        //alert('i=' + i);
	if(songList[i] == $(this).attr('rel')){
		//alert($(this).attr('rel'));
currentSong = 0 + parseInt(i,10);
		}
}
   	});
   	
   	$('#next').click(function(){
   	changeSong('plus')
   	});
   	$('#back').click(function(){
   	changeSong('minus')
   	});
   	function changeSong(addition){
   		if(addition == 'plus'){
   			if(currentSong == songList.length - 1){
   				currentSong = 0;
   				}else{
   			currentSong = currentSong + 1;}
   			} else if 
   			(addition == 'minus'){
   				if(currentSong == 0){
   					currentSong = songList.length - 1;
   					} else {
   				currentSong = currentSong - 1;
   				}
   				}
//alert(currentSong);
   				$('audio').detach();
   	  var audio2 = new Audio();
   	  audio2.src='/music/' + encoding + '/' + songList[currentSong];
        audio2.setAttribute('controls', true);
        audio2.setAttribute('autobuffer', false);
			$('#thePlayer').append(audio2);
        audio2.load();
        audio2.play();
   		};

$.getJSON('javascripts/all-media.json', function(data) {
//hot n cold console.log(data[0].ID3v2.TIT2);
//console.log(data[].ID3v2.TIT2)
//console.log(data);
/*var songs = [];
$.each(data, function(index, value){
if(data[index].ID3v2){
songs.push('<li>' + data[index].ID3v2.TIT2 + ',' + data[index].ID3v2.TPE1 + '</li>')
}else if(data[index].ID3v1){}

});
$('<ul/>', {
    'class': 'my-new-list',
    html: songs.join('')
  }).appendTo('body');
*/
/*  var items = [];

  $.each(data, function(key, val) {
    items.push('<li id="' + key + '">' + val + '</li>');
  });

  $('<ul/>', {
    'class': 'my-new-list',
    html: items.join('')
  }).appendTo('body');*/
});

 });
