/**
 * Created by karth on 4/24/2016.
 */

var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('visual');
});

module.exports = router;