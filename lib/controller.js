var url = require('url'),
  s = require('./station'),
  stations = [];

module.exports.handleIcecast = function(req, res, next) {
  console.log('reqd');
    switch(req.method){
      
      case 'GET':
      stationName = req.url.split('/');
      for(station in stations){
        console.log('station=' + stations[station].name)
        if(stationName[1] == stations[station].name){
          stations[station].play(req, res, next);
        } else{
          res.write('No such Station');
          res.end();
        }
      }
      
      break;
      
      case 'POST':
      //Sends data in the form of {name:'name', f:'create', file:'file'}
        u = req.body;
        console.log(req.body)
        switch(u.f){
          
          case 'create':
          stations.push(new s(req.body.name, req.body.files));
          console.log('stations =' + stations);
          break;
          
          case 'add':
          for(station in stations){
            console.log('station=' + stations[station].name);
            if(req.body.name == stations[station].name){
              stations[station].add(files);
            }
          }
          break;
          
        }
      break;
    }
};