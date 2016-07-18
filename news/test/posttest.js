var expect  = require("chai").expect;
var superagent  = require("superagent");
var assert = require('chai').assert;
var url = 'http://localhost:3000';

describe('homepage', function(){
var token = '';

before(function(done) {
    superagent
      .get(url+'/api/v1/post/get-token')
      .end(function(err, res){
        var result = JSON.parse(res.text);
        token = result.token;
        done();
	});
   });

  it('POST',function(done){
    superagent
      .post(url+'/api/v1/post')
	  .send({ title: 'titleeee', link: 'linkk' })
	  .set('Authorization', 'Bearer ' + token)
	  .set('Accept', 'application/json')
      .end(function(err, res){
	   assert.equal(res.status, 201, ['not correct'])
	   done();
    })
  })
  });
  

