var express = require('express');
var router = express.Router();

var user = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res) {
	user.getUsers(function(err, users){
		if(err) throw err;
		res.json(users);
	});
});

// Get user by ID
router.get('/:id', function(req, res) {
	user.getUser(parseInt(req.params.id), function(err, user) {
		if (err) throw err;
		res.json(user);
	});
});

// Get user by name
router.get('/user/:name', function(req, res) {
	user.getUserName(req.params.name, function(err, user) {
		if (err) throw err;
		res.json(user);
	});
});

// Post user name and password
router.post('/', function(req, res) {
	user.addUser(req.body.name, req.body.password, function(err, user) {
		if (err) throw err;
		res.json(user);
	});
});



module.exports = router;