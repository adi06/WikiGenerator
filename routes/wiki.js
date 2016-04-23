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

	messages.getWiki(req.params.question,function(err, msg){
		if (err) throw err;
		res.json(msg);
	});
});

module.exports =router;
