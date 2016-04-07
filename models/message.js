//TODO remove monk and use Mongoclient
var monk = require('monk');
var db = monk('localhost:27017/wikigenerator');
var collection = db.get('messages');

var dbCon = require('../db');
var myCollection;
dbCon.getConnection(function(err, db){
	myCollection = db.collection('messages');
});

// select all messages from database
exports.getMessages = function(callback){
	collection.find({}, function(err, msg){
		if (err) throw err;
		callback(null, msg);
	});
}

// insert messages to database
exports.addMessage = function(userId, threadId, msg, callback) {
	collection.insert({
						userId : userId,
						threadId : threadId, 
						message : msg,
						rating : 0
						}, function(err, message) {
					  		if (err) throw err;
					  		callback(null, message);
					  });
}

// get latest wiki
exports.addToWiki = function(callback){
	
myCollection.aggregate(
	[
	{ $match: { rating: { $gt : 1 } } },
	   	{
	     $group: {
	        _id: {
	           threadId: "$threadId",
	           message: "$message"
	        }
	     }
	   }
	],
	function(err, result){
		if (err) throw err;
		console.log("the result is",result);
		console.log("id",result[0]._id.message);
		callback(null, result);
	}
	);
}

