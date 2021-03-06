var express = require('express');
var router = express.Router();

module.exports = function(passport){

  
    router.get('/success', function(req, res){
        res.send({state: 'success', user: req.user ? req.user : null});
    });

    router.get('/failure', function(req, res){
        res.send({state: 'failure', user: null, message: "Invalid username or password"});
    });

    //log in
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/api/forum',
        failureRedirect: '/signup'
    }));

    router.get('/facebook', passport.authenticate('facebook'));

    //sign up
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/login.html',
        failureRedirect: '/'
    }));

    //log out
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;

}