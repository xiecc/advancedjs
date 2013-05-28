var http = require ('http');

http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Hello\r\n');

  setTimeout(function(){
    response.end('world \r\n');
  },2000);
}).listen(8000);

