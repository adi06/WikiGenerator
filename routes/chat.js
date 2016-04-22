var express = require('express');
var path = require('path');
var router = express.Router();
var socket_io = require('../io');
var message = require('../models/message');

var logged_username;
var current_question;

/* GET chat page. */
router.get('/', function(req, res) {
    console.log("session data",req.session.username);
    console.log("question ",req.session.question);
    res.render('chat',{question: req.session.question});
});

/*question from forum*/
router.post('/', function(req, res){
    //console.log(req.body.question);
    req.session.question = req.body.question;
    logged_username = req.session.username;
    current_question = req.body.question;
    res.json(req.body.question);
});

router.post('/send', function(req, res) {
    console.log("user",req.sessioin.username);
    console.log("msg",req.body.msg);
    var response
    message.addMessage(req.body.msg, function(err, out_msg){
            socket_io.emit('output',[out_msg]);
            response=out_msg;
        });
    res.json(response);
});


socket_io.on('connection', function(socket){
    console.log('user conn');

    message.limit100Messages(function(err, result){
        if (err) throw err;
        socket.emit('output',result.reverse());
    });

    socket.on('input', function(err, data){
        var msg = data.message,
            msg_tag = data.tag;

        if(err) throw err;

        //emit all the messages to all clients
        /*var sendItem = {username: logged_username, message: msg, like:0, tag: msg_tag};
        message.addMessage(sendItem, function(err, out_msg){
            socket_io.emit('output',[out_msg]);
        });*/
    });

    socket.on('like', function(data){
        message.processLikes(data, function(err, ret_likes){
            socket_io.emit('liked',ret_likes);
        });
    });
});

module.exports = router;
