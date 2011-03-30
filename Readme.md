Icecast with node
=======================
Deps:

ffmpeg  
lame  
oggenc (vorbis-tools)  

NPM:    
icecast-stack    
colors  
express 2.x  

Step 1
==============
clone the github repo and install dependencies:

Ubuntu:
FFMPEG and Vorbis Tools (oggenc)  
    sudo apt-get ffmpeg vorbis-tools

LAME:
    wget http://sourceforge.net/projects/lame/files/lame/3.98.4/lame-3.98.4.tar.gz/download
    tar zxvf lame-3.98.4.tar.gz  
    cd lame-3.98.4  
    ./configure  
    make  
    make install  

Test installations by typing these commands, each command should show an error message (no files selected)  

    ffmpeg  
    lame  
    oggenc  

Step 2
==============
Create a music folder  
Place music files in music folder.  
!important  The file extensions in the music folder must be compatible with decoding in ffmpeg  

Step 3
==============  
    node app.js

Step 4
============
Listen to the stream by navigating to the IP address of the computer ie. 255.255.255.255:3000  
Will stream .ogg or .mp3 based on browser  


TODO
===============
Similar artists list, client side  
make it look nicer and clean up code (jslint)  
test on ipod  
test on Android, (support for audio tag, no support for codecs? AKA sometimes it works, sometimes it doesn't)  
