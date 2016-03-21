var monk = require('monk');
var db = monk('localhost:27017/wikigenerator');
var collection = db.get('messages');

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
