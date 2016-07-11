var Posts = require('./Posts');

exports.index = function(req, res) {
    console.log('inside');
	Posts.find(function (err, posts) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(posts);
  });
};

exports.show = function(req, res) {
	Posts.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!customer) { return res.status(404).send('Not Found'); }
    return res.json(post);
  });
};

exports.create = function(req, res) {
	Posts.create(req.body, function(err, post) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(post);
  });
};


exports.param = function(req, res, next, id) {
  var query = Post.findById(id);
  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
};


exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  console.log('updating code ****$$$$$$$$$$$$$$$$$*********', req.body);
  Posts.findById(req.params.id, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    var updated = _.merge(post, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(post);
    });
  });
};

exports.destroy = function(req, res) {
	Posts.findById(req.params.id, function (err, codedecode) {
    if(err) { return handleError(res, err); }
    if(!codedecode) { return res.status(404).send('Not Found'); }
    codedecode.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}