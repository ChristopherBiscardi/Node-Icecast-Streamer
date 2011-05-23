$(document).ready(function() {
  $('#createStation').click(function(){
   
alert('clicked');
    $.ajax({
     type: "POST",
     url: "/station/myStation",
     data: "name=myStation&f=create&song=01.mp3",
     success: function(msg){
       alert( "Data Saved: " + msg );
     }
   });
   //$.post("station/myStation", { name: "John", time: "2pm" } );
  })
});