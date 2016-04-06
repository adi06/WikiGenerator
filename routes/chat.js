var express = require('express');
var router = express.Router();
var io = require('../io');

//TODO move to model -- using only for testing
var MongoClient = require('mongodb').MongoClient;
var myCollection;
var db = MongoClient.connect('mongodb://127.0.0.1:27017/wikigenerator', function(err, db) {
    if(err)
        throw err;
    console.log("connected to the mongoDB !");
    myCollection = db.collection('messages');
});


router.get('/', function(req, res) {
	io.emit("hi");
	console.log("chat router");
})


module.exports = router;