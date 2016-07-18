var expect  = require("chai").expect;
var superagent  = require("superagent");
var request = require('request');
var assert = require('chai').assert;
var app = require('../app.js');
//var Post =  require('../models/posts/Posts');

var url = 'http://localhost:3000';

describe('homepage', function(){

var token = '';

before(function(done) {
    superagent
      .get('http://localhost:3000/api/v1/post/get-token')
      .end(function(err, res){
        var result = JSON.parse(res.text);
        token = result.token;
        done();
	});
   });

  it('should respond to GETtt',function(done){
    superagent
      .post('http://localhost:3000/api/v1/post')
	  .send({ title: 'titleeee', link: 'linkk' })
	  .set('Authorization', 'Bearer ' + token)
	  .set('Accept', 'application/json')
      .end(function(err, res){
	   assert.equal(res.status, 201, ['not correct'])
	   done();
    })
  })
  });
  

