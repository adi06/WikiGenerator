var express = require('express');
var path = require('path');
var dbCon = require('../db');
var myCollection;
dbCon.getConnection(function(err, db){
    myCollection = db.collection('wiki');
});

exports.createWiki = function(id, callback){
    var message = {"id": id, "content": {}};
    myCollection.insert( message);
}