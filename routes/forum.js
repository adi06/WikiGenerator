/**
 * Created by karth on 4/18/2016.
 */
var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('forum',{user : req.session.username});
});



module.exports = router;