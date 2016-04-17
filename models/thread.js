
// Get all threads from database
exports.getThreads = function(callback){
	collection.find({}, function(err, threads){
		if (err) throw err;
		callback(null, threads);
	});
}

exports.addThreads = function(title, callback) {
	collection.insert({title : title}, function(err, thread) {
		if (err) throw err;
		callback(null,thread);
	});
}
