var net = require('net');
var s = net.createServer();
s.on('connection', function(socket) {
  socket.write('hello\n');
  socket.end('world\n');
});

s.listen(8000);


