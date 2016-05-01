var dbCon = require('../db');
var myCollection;
dbCon.getConnection(function(err, db){
	myCollection = db.collection('messages');
});

//limit to 100 messages
exports.limit100Messages = function(current_question, callback){
	myCollection.find({"question":current_question}).limit(20).sort({_id: -1}).toArray(function(err, res1){
	if(err) throw err;
	return callback(null, res1);
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
		username : msg.username,
		question : msg.question,
		qncontent : msg.qncontent,
		message : msg.message,
		like : 0,
		tag : msg.tag,
		likedPeople : []
	};
	myCollection.insert( insert_message, function(err){
		if (err) throw  err;
		//console.log('second',insert_message.message);
		callback(null, insert_message);
	});
};

//like processing
exports.processLikes = function(data, callback){
	var ObjectId = require('mongodb').ObjectID;
	var count;
	var msg;

	myCollection.findOneAndUpdate(
		{$and : [{"_id" : ObjectId(data.messageID)}, {"likedPeople" : {$nin:[data.username]}}]},
		{ $inc: { like: 1}, $push : {likedPeople: data.username}},
		{projection :{ "_id":1, "like":1, "question":1, "username":1}}
	);

	callback(null, data);
};


exports.getWiki = function(question, callback){

myCollection.aggregate(
	[
	{ $match: { like: { $gt : 0 }, question: question } },
	   	{
	     $group: {
	        _id: {
				id :"$_id",
	           question: "$question",
	           message: "$message",
	           tag : "$tag",
			   author : "$username"
	        }
	     }
	   }
	],
	function(err, result){
		if (err) throw err;
		console.log("the result is",result);
		callback(null, result);
	}
	);
}

