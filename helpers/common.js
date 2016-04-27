var loggedUsers = [];


exports.adduser = function(userid){
    console.log('user added to list');
    loggedUsers.push(userid);
    console.log(loggedUsers);
}

exports.getusers = function(){
    return loggedUsers;
}