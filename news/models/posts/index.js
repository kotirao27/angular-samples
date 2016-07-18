'use strict';

var express = require('express');
var ejwt = require('express-jwt');
var auth = ejwt({secret: 'SECRET', userProperty: 'payload'});
var jwt = require('jsonwebtoken');
var Posts = require('./Posts');
var router = express.Router();

router.post('/', auth, function(req, res, next) {
  Posts.create(req.body, function(err, post) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(post);
  });
});

router.get('/', auth, function(req, res, next) {
	Posts.find(function (err, posts) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(posts);
  });
});

router.get('/get-token', function(req, res, next) {
  var token = jwt.sign({username: 'koti'}, 'SECRET');
  console.log('token  : '+token);
  res.send({token: token});
});

module.exports = router;
