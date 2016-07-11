'use strict';
var mongoose = require('mongoose');
var passport = require('passport');
var express = require('express');
var User = mongoose.model('User');
var router = express.Router();

router.post('/', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password)
  user.save(function (err){
    if(err){ return next(err); }
    return res.json({token: user.generateJWT()})
  });
});

module.exports = router;
