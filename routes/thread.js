var express = require('express');
var router = express.Router();

var threads = require('../models/thread.js');

/* GET thread listing. */
router.get('/', function(req, res) {
	threads.getThreads(function(err, threads){
		if (err) throw err;
		res.json(threads);
	});
});

router.post('/', function(req, res) {
	threads.addThreads(req.body.title, function(err, thread) {
		if (err) throw err;
		res.json(thread);
	});
});

module.exports = router;