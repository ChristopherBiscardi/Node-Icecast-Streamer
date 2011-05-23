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
