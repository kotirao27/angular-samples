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
  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }
    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});
module.exports = router;
