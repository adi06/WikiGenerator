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

module.exports = router;