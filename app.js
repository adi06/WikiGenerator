var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var initPassport = require('./passport-init');
initPassport(passport);

var authenticate = require('./routes/authenticate')(passport);
var routes = require('./routes/index');
var chat = require('./routes/chat');
var users = require('./routes/user');
var threads = require('./routes/thread');
var messages = require('./routes/message');
var wiki = require('./routes/wiki');
var forum = require('./routes/forum');
var stat = require('./routes/stat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('stylesheets', path.join(__dirname, 'public/stylesheets'))
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);
app.use('/auth',authenticate);
app.use('/api/chat', chat);
app.use('/api/users', users);
app.use('/api/threads', threads);
app.use('/api/messages', messages);
app.use('/api/wiki',wiki);
app.use('/api/forum', forum);
app.use('/api/stat', stat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.use(session({
  cookieName: 'session',
  secret: 'tolcs16',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}))


module.exports = app;
