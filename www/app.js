var connect = require('connect'),
  icecast = require('../');

connect.createServer()
   .use(connect.favicon())
   .use(connect.logger())
   .use(connect.static(__dirname + '/public'))
   .use(connect.bodyParser())
   .use('/station', icecast.handleIcecast)
   .listen(3000);
