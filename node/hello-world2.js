
setInterval(function() {
  console.log(' world');
}, 500);

console.log('hello');

process.on('SIGINT',function() {
  console.log('good bye');
  process.exit(0);
});
