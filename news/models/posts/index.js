'use strict';

var express = require('express');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
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

module.exports = router;
