var io = require('socket.io')();

/*io.on('connection', function(socket){
  socket.on('chat msg', function(msg) {
  	io.emit('chat msg', msg);
  });
});*/

module.exports = io;
