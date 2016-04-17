var express = require('express');
var path = require('path');
var router = express.Router();
var socket_io = require('../io');
var message = require('../models/message');


/* GET chat page. */
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/../public/chat.html'));
});

socket_io.on('connection', function(socket){
    console.log('user conn');

    message.limit100Messages(function(err, result){
        if (err) throw err;
        socket.emit('output',result.reverse());
    });

    socket.on('input', function(data, err){
        console.log("entered input");
        console.log(data);
        var name = data.name,
            msg = data.message,
            msg_tag = data.tag;

        if(err) throw err;

        //emit all the messages to all clients
        var sendItem = {name: name, message: msg, like:0, tag: msg_tag};
        message.addMessage(sendItem, function(err, out_msg){
            socket_io.emit('output',[out_msg]);
        });
    });

    socket.on('like', function(data){
        message.processLikes(data, function(err, ret_likes){
            socket_io.emit('liked',ret_likes);
        });
    });
});

module.exports = router;