var url = require('url'),
  s = require('./station'),
  stations = [];


module.exports.handleIcecast = function(req, res, next) {
  console.log('reqd');
    switch(req.method){
      
      case 'GET':
      stationN = req.url.split('/');
      stationName = stationN[1].split('.');
      console.log('ofneohfeojfoej' + stationName[0]);
      for(station in stations){
        console.log('station=' + stations[station].name)
        
        if(stationName[0] == stations[station].name){
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
          console.log('req.body.files=' + req.body.files)
          stations.push(new s(req.body.name, req.body.files));
          console.log('stations =' + stations);
          break;
          
          case 'add':
          for(station in stations){
            console.log('station=' + stations[station].name);
            if(req.body.name == stations[station].name){
              stations[station].add(req.body.files);
            }
          }
          break;
          
        }
      break;
    }
};