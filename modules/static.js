var fs = require('fs');

var path = require('path');

module.exports = function(request, response) {

  var extname = path.extname(request.url);
  switch(extname) {
    case '.css':
      contentType = 'text/css';
      break;
    default:
      contentType = 'text/html';
      break;
  }

  response.writeHead(200, {'Content-type': contentType});

  if(path.dirname(request.url) === '/stylesheet') {
    fs.readFile('stylesheet/' + path.basename(request.url), 'utf8', function (errors, contents){
      if (errors) {
        response.end('File not found');
      } else {
        response.write(contents);
        response.end();
      }
    });
  } else {
    if(request.url === '/') {
      fs.readFile('views/index.html', 'utf8', function (errors, contents){
        response.write(contents);
        response.end();
      });
    } else {
      fs.readFile(path.join('views/', path.basename(request.url)) + '.html', 'utf8', function(errors, contents) {
        if (errors) {
          console.log('errors');
        } else {
          response.write(contents);
          response.end();
        }
      });
    }
  }

}