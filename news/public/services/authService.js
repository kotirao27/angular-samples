app.factory('auth', ['$http', '$window', function($http, $window){
   var auth = {};
   auth.saveToken = function (token){
  $window.localStorage['news-token'] = token;
  };

  auth.isLoggedIn = function(){
  var token = auth.getToken();
  if(token){
    var payload = JSON.parse($window.atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  } else {
    return false;
  }
};
  auth.currentUser = function(){
  if(auth.isLoggedIn()){
    var token = auth.getToken();
    var payload = JSON.parse($window.atob(token.split('.')[1]));
    return payload.username;
  }
};

auth.register = function(user){
  return $http.post('/api/v1/register', user).success(function(data){
    auth.saveToken(data.token);
  });
};

auth.logIn = function(user){
  return $http.post('/api/v1/login', user).success(function(data){
    auth.saveToken(data.token);
  });
};
auth.logOut = function(){
  $window.localStorage.removeItem('news-token');
};

   auth.getToken = function (){
  return $window.localStorage['news-token'];
  }
  return auth;
 
}])