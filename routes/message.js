var express = require('express');
var router = express.Router();

var messages = require('../models/message.js');

/* GET message listing. */
router.get('/', function(req, res) {
	messages.getMessages(function(err, msg){
		if (err) throw err;
		res.json(msg);
	});
});

router.post('/', function(req, res) {
	messages.addMessage(req.body.userId, req.body.threadId, req.body.message, 
						function(err, msg) {
							if (err) throw err;
							res.json(msg);
						});
});

module.exports = router;
