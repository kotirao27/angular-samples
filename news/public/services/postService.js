app.factory('posts', ['$http','auth', function($http, auth){
  var o = {
    posts: []
  };

   o.getAll = function(){
   return $http.get('/api/v1/post',{
    headers: {Authorization: 'Bearer '+auth.getToken()}
  }).success(function(data){
    angular.copy(data,o.posts);
  });  
  };

  o.create = function(post) {
  console.log(post);
  return $http.post('/api/v1/post', post,{
    headers: {Authorization: 'Bearer '+auth.getToken()}
  }).success(function(data){
    o.posts.push(data);
  });
};
 
 return o;
  
}]);