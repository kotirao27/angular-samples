'use strict';

var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var mongoose = require('mongoose');
var postss =  require('./models/posts/Posts');
var user =  require('./models/userlogin/User');
var passport = require('./config/passport');
mongoose.connect('mongodb://localhost/news',{safe: true});
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
var passport = require('passport');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', routes);
app.use('/api/v1/post', require('./models/posts/index'));
app.use('/api/v1/post/get-token', require('./models/posts/index'));
app.use('/api/v1/register', require('./models/userregister/index'));
app.use('/api/v1/login', require('./models/userlogin/index'));


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


module.exports = app;
