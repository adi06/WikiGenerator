var express = require('express');
var router = express.Router();

var messages = require('../models/message.js');

function isAuthenticated (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects

    //allow all get request methods
    if(req.method === "GET"){
        return next();
    }
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not authenticated then redirect him to the login page
    return res.redirect('/');
};

//Register the authentication middleware
router.use('/posts', isAuthenticated);

/* GET message listing. */
router.get('/', function(req, res) {
	messages.getMessages(function(err, msg){
		if (err) throw err;
		res.json(msg);
	});
});

router.route('/posts')

    .post(function(req, res) {
	   messages.addMessage(req.body.userId, req.body.threadId, req.body.message,
						function(err, msg) {
							if (err) throw err;
							res.json(msg);
						});
});

module.exports = router;
