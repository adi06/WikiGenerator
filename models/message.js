var dbCon = require('../db');
var myCollection;
dbCon.getConnection(function(err, db){
	myCollection = db.collection('messages');
});

//limit to 100 messages
exports.limit100Messages = function(callback){
	myCollection.find().limit(20).sort({_id: -1}).toArray(function(err, res){
	if(err) throw err;
	return	callback(null, res);
	});
};

// select all messages from database
exports.getMessages = function(callback){
	collection.find({}, function(err, msg){
		if (err) throw err;
		callback(null, msg);
	});
}

// insert messages to database
exports.addMessage = function(msg, callback) {
	console.log('test:'+ msg.message);
	var insert_message = {
		name : msg.name,
		message : msg.message,
		like : 0,
		message_id: msg._id,
	};
	myCollection.insert( insert_message, function(err){
		if (err) throw  err;
		//console.log('second',insert_message.message);
		callback(null, insert_message);
	});
}

//like processing
exports.processLikes = function(data, callback){
	//console.log(data);

	var ObjectId = require('mongodb').ObjectID;
	var count;
	var msg;
	myCollection.findOne({"_id" : ObjectId(data.messageID)},function(err, obj){
		if(err) throw err;
		count = obj.like;
		msg = obj.message;
	});

	myCollection.update(
		{"_id" : ObjectId(data.messageID)},
		{ $inc: { like: 1} }
	);
	callback(null, data);
};

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

