var loggedUsers = [];

exports.adduser = function(userid){
    var flag = 0;
    for(i =0; i< loggedUsers.length; i++)
    {
     if(loggedUsers[i]== userid)
        flag = 1
    }
    if(flag  == 0){
        loggedUsers.push(userid);
    }
}

exports.getusers = function(){
    return loggedUsers;
}