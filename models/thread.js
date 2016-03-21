var monk = require('monk');
var db = monk('localhost:27017/wikigenerator');
var collection = db.get('threads');

// select all threads from database
var getThreads = function(callback){
	collection.find({}, function(err, threads){
		if (err) throw err;
		callback(null, threads);
	});
}



module.exports = {
					getThreads : getThreads			
				  }