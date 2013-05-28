var http = require('http');
http.createServer(function(request, response) {
  response.writeHeader(200, {'Content-Type:':'text/plain'});
  response.write('hello\r\n');
  response.end('world\r\n');
}).listen(8000);


