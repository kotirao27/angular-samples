var app = angular.module('news', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: "/home",
           templateUrl: '/home/home.html',
		   controller: 'MainCtrl',
		   resolve: {
           postPromise: ['posts', function(posts){
           return posts.getAll();
             }]
            }			
		})
		.state('login', {
         url: '/login',
         templateUrl: '/user/login.html',
         controller: 'AuthCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
         $state.go('home');
           }
          }]
        }).state('register', {
         url: '/register',
         templateUrl: '/user/register.html',
         controller: 'AuthCtrl',
         onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
         $state.go('home');
          }
          }]
        }).state('/', {
			url: "/",
           templateUrl: '/landingpage/landing.html',
		   controller: 'NavCtrl',		  
		})
	$urlRouterProvider.otherwise("/");
});