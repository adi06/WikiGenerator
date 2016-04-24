var express = require('express');
var router = express.Router();

var messages = require('../models/message.js');

// GET the wiki page
router.get('/', function(req, res) {
    var description = "TODO description";
    var history = "TODO history";
    var news = "TODO news";
    var comments = "TODO comments";
    var suggestion = "TODO suggestion";

    res.render('wiki',{"description":description,
                       "history":history,
                       "news":news,
                       "comments":comments,
                       "suggestion":suggestion});
});
//TODO
// Fetch latest wiki
router.get('/latest/:question', function(req , res){
  console.log(req.params.question);
    var description = "";
    var history = "";
    var news = "";
    var comments = "";
    var suggestion = "";

  messages.getWiki(req.params.question,function(err, msg){
		if (err) throw err;
    var messg;
    var tag;
    for(var i = 0; i < msg.length; i++) {
      messg = msg[i]._id.message;
      tag = msg[i]._id.tag;
      console.log(tag);
}
		res.json(msg);
	});
});

module.exports =router;
