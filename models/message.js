var monk = require('monk');
var db = monk('localhost:27017/wikigenerator');
var collection = db.get('messages');

// select all messages from database
var getMessages = function(callback){
	collection.find({}, function(err, msg){
		if (err) throw err;
		callback(null, msg);
	});
}



module.exports = {
					getMessages : getMessages			
				  }