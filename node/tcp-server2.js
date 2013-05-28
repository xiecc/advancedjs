var net = require('net');
net.createServer(function(socket) {
  socket.write('hello world\n');
  socket.on('data', function(data) {
    socket.write(data.toString().toUpperCase());
  });
}).listen(8000);


