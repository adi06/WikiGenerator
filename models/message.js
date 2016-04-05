var monk = require('monk');
var db = monk('localhost:27017/wikigenerator');
var collection = db.get('messages');

var MongoClient = require('mongodb').MongoClient;
var myCollection;
var db = MongoClient.connect('mongodb://127.0.0.1:27017/wikigenerator', function(err, db) {
    if(err)
        throw err;
    console.log("connected to the mongoDB !");
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

