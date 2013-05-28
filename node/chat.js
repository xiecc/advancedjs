var net = require('net');
var clients = []; 
net.createServer(function(client) {
  client.write('Enter your name:\n'); 
  client.once('data', function(data) {
    var username = data.toString().trim(); 
    clients.push(client); 
    broadcast(username + ' : Join!\n'); 
    client.on('data', function(data) {
      var text = username + ' : ' + data;
      broadcast(text); });
    }); 
}).listen(8000);

function broadcast(text) {
  console.log(text.trim());
  for (i = 0; i< clients.length; i++) {
    var c = clients[i];
    c.write(text);
  }
}
