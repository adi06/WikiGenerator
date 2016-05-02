
//Configure db connection
var mongoClient = require('mongodb').MongoClient;

exports.getConnection = function(callback) {
	mongoClient.connect('mongodb://wikigen:wikigen@ds011912.mlab.com:11912/wikigenerator', function(err, db) {
		if (err)
			throw err;
		console.log('connected to MongoDB');
		callback(null,db);
	});
}
