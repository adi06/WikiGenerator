var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var env_config = require('./helpers/common').config();
var bCrypt = require('bcrypt-nodejs');

var dbCon = require('./db');
var myCollection;
dbCon.getConnection(function(err, db){
    myCollection = db.collection('user');
});

//temporary data store
var users = {};

module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user:',user.username);
        return done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {

        return done(null, username);

    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {

            myCollection.findOne({ 'username' :  username },
        function(err, user) {
        // In case of any error, return using the done method
        if (err)
            return done(err);
        // Username does not exist, log the error and redirect back
        if (!user){
            console.log('User Not Found with username '+username);
            return done(null, false);
        }
        // User exists but wrong password, log the error
        if (!isValidPassword(user, password)){
            console.log('Invalid Password');
            return done(null, false); // redirect back to login page
        }
        // User and password both match, return user from done method
        // which will be treated like success
        return done(null, user);
    }
);
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            myCollection.findOne({ 'username' :  username }, function(err, user) {
    // In case of any error, return using the done method
    if (err){
        console.log('Error in SignUp: '+err);
        return done(err);
    }
    // already exists
    if (user) {
        console.log('User already exists with username: '+username);
        return done(null, false);
    } else {
                var hashPwd = createHash(password);
                myCollection.insert({username : username,
                                     password : hashPwd},function(err, res){
                                        if (err) throw err;
                                        return done(null,res);
                                     });
            }
        });
       }
    ));

    passport.use('facebook', new FacebookStrategy({
        clientID: env_config.facebook_app_id,
        clientSecret: env_config.facebook_app_secret,
        callbackURL: "http://localhost:3000/api/chat"
        },
        function(accessToken, refreshToken, profile, done) {
            console.log("facebook_profile",profile);

            return done(null,profile);
  }
));

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};