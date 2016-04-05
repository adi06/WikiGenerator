var express = require('express');
var router = express.Router();

var messages = require('../models/message.js');

// GET the wiki page
router.get('/', function(req, res) {
	//res.render('wiki', { title : 'Wiki'});
	//1.Fetch the messages with max votes
	//2. Seperate the messages based on message topics
	//3. Write these to a file
    var title = "Welcome to wiki";
    var pagetitle = "Welcome to wiki page";
    var content = "Content will be updated soon!!";
    res.writeHead(200, {
    'Content-Type': 'text/html'});
	res.write(['<!doctype html>',
  '<html lang="en">\n<meta charset="utf-8">\n<title>{title}</title>',
  '<h1>{pagetitle}</h1>',
  '<div id="content">{content}</div>']
  .join('\n')
  .replace(/{title}/g, title)
  .replace(/{pagetitle}/g, pagetitle)
  .replace(/{content}/g, content));
	res.end();

});
//TODO
// Fetch latest wiki
router.get('/latest', function(req , res){
	messages.addToWiki(function(err, msg){
		if (err) throw err;
		res.json(msg);
	});
});

module.exports =router;
	