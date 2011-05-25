Icecast with node
=======================
Deps:

node v0.4.7  

ffmpeg  
lame  
oggenc (vorbis-tools)  

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
mount connect middleware
    use('/station', icecase.handleIcecast)

To create a Station:
===============

POST to /station  

with data in the form of:  
    name=thenameofyourstation&f=create&file=file  

where name is the name of the new station  
f is the function create a new station  
and file is the first song for the playlist  

To add a song to a playlist
=============================

POST to /station  

with name, f=add and filepaths  
