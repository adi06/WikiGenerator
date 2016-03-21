var monk = require('monk');
var db = monk('localhost:27017/wikigenerator');
var collection = db.get('users');

// select all users from database
var getUsers = function(callback){
	collection.find({}, function(err, users){
		if (err) throw err;
		callback(null, users);
	});
}



module.exports = {
					getUsers : getUsers			
				  }