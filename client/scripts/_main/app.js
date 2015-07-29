var app = angular.module('app', ['ui.router', 'mgcrea.ngStrap', 'ngAnimate', 'satellizer', 'angular-jwt', 'angularFileUpload']);

app.config(function($stateProvider, $urlRouterProvider, $authProvider){
  $stateProvider
  .state('home',{
    url: '/',
    templateUrl: 'partials/about.html',
    resolve: {
     authenticated: function($q, $location, $auth) {
       var deferred = $q.defer();

       if (!$auth.isAuthenticated()) {
         $location.path('/login');
       } else {
         deferred.resolve();
       }
       return deferred.promise;
     }
    }
  })
  .state('user', {
    url: '/user',
    templateUrl: 'partials/profile.html',
    controller: 'userCtrl',
    resolve: {
     authenticated: function($q, $location, $auth) {
       var deferred = $q.defer();

       if (!$auth.isAuthenticated()) {
         $location.path('/login');
       } else {
         deferred.resolve();
       }
       return deferred.promise;
     }
    }
  })
  .state('menu', {
    url: '/menu',
    templateUrl: 'partials/menu.html'
  })
  .state('meal', {
    url: '/meal',
    templateUrl: 'partials/meal.html'
  })
  .state('about', {
    url: '/about',
    templateUrl: 'partials/about.html'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'partials/signup.html',
    controller: 'signupCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'partials/login.html',
    controller: 'loginCtrl'
  })

  .state('dashboard', {
    url:'/dashboard',
    templateUrl: 'partials/dashboard.html'
  })

  .state('ingredients', {
    url:'/ingredients',
    templateUrl: 'partials/ingredients.html'
  })

  .state('logout', {
    url: '/logout',
    template: null,
    controller: 'logoutCtrl'
  });

  $urlRouterProvider.otherwise('/');

});
