var express = require('express');
var router = express.Router();

var messages = require('../models/message.js');

// GET the wiki page
router.get('/', function (req, res) {

    res.render('wiki', {
        "description": req.session.description,
        "history": req.session.history,
        "news": req.session.news,
        "comments": req.session.comments,
        "suggestion": req.session.suggestion,
        "authors": req.session.authors
    });
});
//TODO
// Fetch latest wiki
router.get('/latest/:question', function (req, res) {
    console.log(req.params.question);
    var description = [];
    var history = [];
    var news = [];
    var comments = [];
    var suggestion = [];
    var authors = {};
    messages.getWiki(req.params.question, function (err, msg) {
        if (err) throw err;
        var messg;
        var tag;
        var author;

        for (var i = 0; i < msg.length; i++) {
            messg = msg[i]._id.message;
            tag = msg[i]._id.tag;
            author = msg[i]._id.author;
            id = (msg[i]._id.id);

            if (!authors[author]) {
                authors[author] = 0;
            }
            authors[author] += 1;

            if (tag == 'Description') {
                temp = [];
                temp.push(id);
                temp.push(messg);
                description.push(temp);
            }

            else if (tag == 'History') {
                temp = [];
                temp.push(id);
                temp.push(messg);
                history.push(temp);
            }

            else if (tag == 'NewsFeed') {
                temp = [];
                temp.push(id);
                temp.push(messg);
                news.push(temp);
            }

            else if (tag == 'Comments') {
                temp = [];
                temp.push(id);
                temp.push(messg);
                comments.push(temp);
            }

            else if (tag == 'None') {
                temp = [];
                temp.push(id);
                temp.push(messg);
                suggestion.push(temp);
            }
        }
        req.session.description = description;
        req.session.history = history;
        req.session.news = news;
        req.session.comments = comments;
        req.session.suggestion = suggestion;
        req.session.authors = authors;

        res.json({
            "description": description,
            "history": history,
            "news": news,
            "comments": comments,
            "suggestion": suggestion,
            "authors": [authors]
        });
    });
});

module.exports = router;
