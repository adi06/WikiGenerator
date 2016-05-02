var express = require('express');
var path = require('path');
var router = express.Router();
var socket_io = require('../io');
var message = require('../models/message');
var randstring = require('randomstring');
var wiki = require('../models/wiki');
var utils = require('../helpers/common.js');
var logged_username;
var current_question;
var question_content;
var wikiID;
/* GET chat page. */
router.get('/', function(req, res) {
    wikiID = randstring.generate(7);
    console.log("session data",req.session.username);
    console.log("question ",req.session.question);
    wiki.createWiki(wikiID);
    var loggedinusers = utils.getusers();
    res.render('chat',{ question: req.session.question, qcontent: req.session.qncontent, username: req.session.username,activeusers:loggedinusers  });
});

/*question from forum*/
router.post('/', function(req, res){
    //console.log(req.body.question);
    req.session.question = req.body.question;
    req.session.qncontent = req.body.qncontent;
    logged_username = req.session.username;
    current_question = req.body.question;
    question_content = req.body.qncontent;
    res.json(req.body);
});

router.post('/send', function(req, res) {
    var msg_req = {
        "username" : req.session.username,
        "question" : current_question,
        "qncontent": question_content,
        "message" : req.body.msg,
        "tag" : req.body.tag
    };

    message.addMessage(msg_req, function(err, out_msg){
            if(err) throw err;
            socket_io.emit(out_msg.question+'-output',[out_msg]);
        });
    res.end();
    
});

socket_io.on('connection', function(socket){
    console.log('user connected');

    message.limit100Messages(current_question, function(err, result){
        if (err) throw err;
        socket.emit(current_question+'-output',result.reverse());
    });

    socket.on('input', function(err, data){
        var msg = data.message,
            msg_tag = data.tag;

        if(err) throw err;
    });

    socket.on('like', function(data){
        message.processLikes(data, function(err, ret_likes){
            if(ret_likes.add_status == true) {
                socket_io.emit(data.question + '-liked', ret_likes);
                ret_likes = null;
            }
        });
    });
});

module.exports = router;
