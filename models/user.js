var monk = require('monk');
var db = monk('localhost:27017/wikigenerator');
var collection = db.get('users');

var crypto = require('crypto');

hash = function(password) {
  return crypto.createHash('sha1').update(password).digest('base64')
}

// select all users from database
exports.getUsers = function(callback){
	collection.find({}, function(err, users){
		if (err) throw err;
		callback(null, users);
	});
}

exports.getUser = function(id, callback){
	collection.findOne({id : id}, function(err, user){
		if (err) throw err;
		callback(null, user);
	});
}

exports.getUserName = function(name, callback){
	collection.findOne({name : name}, function(err, user){
		if (err) throw err;
		callback(null, user);
	});
}

exports.addUser = function(name, password, callback) {
	collection.insert({name : name, password : password}, function(err, user){
		if (err) throw err;
		callback(null, user);
	});
}
