var monk = require('monk');
var db = monk('localhost:27017/wikigenerator');
var collection = db.get('wiki');

/*export.generateWiki = function(callback){

}*/