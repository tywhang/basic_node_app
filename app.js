var http = require('http');

var static_contents = require('./modules/static');

server = http.createServer(function (req, res){
  static_contents(req, res);
});
server.listen(8000);
console.log("Running in localhost at port 8000");