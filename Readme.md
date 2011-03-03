Icecast with node
=======================
Deps:

flac
http://flac.sourceforge.net/download.html

ffmpeg  
lame  
oggenc (located in one of the libogg packages, Vorbis-tools maybe?)  

NPM:    
icecast-stack    


Step 1
==============
clone the github repo and install dependencies

Step 2
==============
Place music files in git repo next to decodeAll.sh  
Current configuration will pick up mp3 and m4a  
This can be adjusted - see below

Step 3
==============
pipe the output from decodeAll to the node-Icecast server  
./decodeAll.sh | node server.js

Step 4
============
Listen to the stream by navigating to the IP address of the computer ie. 255.255.255.255:5556  
Will stream .ogg or .mp3 based on browser  
Works on Mac in Safari, Chrome, Firefox  
Works on Linux in Chrome, Firefox  



Notes
==============
Make sure that the port that the icecast server is started on is the same port as in decodeAll.sh

To pick up other file types that ffmpeg supports change .mp3 to .filetype ie. .m4a or .flac
find "$PWD" -name "*.mp3" >> "$TEMP";
