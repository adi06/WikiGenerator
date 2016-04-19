/**
 * Created by karth on 4/18/2016.
 */
var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/../public/forum.html'));
});

module.exports = router;