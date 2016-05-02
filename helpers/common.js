var loggedUsers = [];


exports.adduser = function(userid){
    if(!(userid in loggedUsers))
    {
        console.log("User already logged in");
        loggedUsers.push(userid);
    }
}

exports.getusers = function(){
    return loggedUsers;
}