
//Configure db connection
var mongoClient = require('mongodb').MongoClient;

exports.getConnection = function(callback) {
	mongoClient.connect('mongodb://127.0.0.1:27017/wikigenerator', function(err, db) {
		if (err)
			throw err;
		console.log('connected to MongoDB');
		callback(null,db);
	});
}
