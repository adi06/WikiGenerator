var express = require('express');
var path = require('path');
var router = express.Router();
var socket_io = require('../io');


/* GET chat page. */
router.get('/', function(req, res) {
   res.sendFile(path.join(__dirname+'/../public/chat.html'));
});

socket_io.on('connection', function(socket){
  console.log('user connected');
  socket.on('chat msg', function(msg) {
  	socket_io.emit('chat msg', msg);
  });
});

module.exports = router;