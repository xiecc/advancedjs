var net = require ('net');

var clients = [];

net.createServer(function(socket) {
  clients.push(socket);
  socket.write('goog lord \r\n');
  socket.on('data', function(data) {
    broadcast(data);
  });
}).listen(8000);

function broadcast(data) {
  for (var i = 0; i < clients.length; i++) {
    var client = clients[i];
    client.write('recevie: ' + data);
  };
}

