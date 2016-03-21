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


module.exports = router;