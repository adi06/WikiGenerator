var express = require('express');
var router = express.Router();

var messages = require('../models/message.js');

// GET the wiki page
router.get('/', function(req, res) {

    res.render('wiki',{"description":req.session.description,
                       "history":req.session.history,
                       "news":req.session.news,
                       "comments":req.session.comments,
                       "suggestion":req.session.suggestion});
});
//TODO
// Fetch latest wiki
router.get('/latest/:question', function(req , res){
  console.log(req.params.question);
    var description = '';
    var history = '';
    var news = '';
    var comments = '';
    var suggestion = '';

  messages.getWiki(req.params.question, function(err, msg){
		if (err) throw err;
    var messg;
    var tag;
      var author;
    
    for(var i = 0; i < msg.length; i++) {
      messg = msg[i]._id.message;
      tag = msg[i]._id.tag;
      author = msg[i]._id.author;

      if (tag == 'Description') {
        description += messg + "\n";
        console.log('description',description);
      }

      else if( tag == 'History') {
        history += messg + "\n";
      }

      else if (tag == 'NewsFeed') {
        news += messg + "\n";
      }

      else if (tag == 'Comments') {
        comments += messg + "\n";
      }

      else if (tag == 'None') {
        suggestion += messg + "\n";
      }
  }

  req.session.description = description;
  req.session.history = history;
  req.session.news = news;
  req.session.comments = comments;
  req.session.suggestion = suggestion;
  req.session.author = author;

  res.json({"description":description,
            "history":history,
            "news":news,
            "comments":comments,
            "suggestion":suggestion});
});
});

module.exports =router;
