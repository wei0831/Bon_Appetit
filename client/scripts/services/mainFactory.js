var app = angular.module('app');

app.factory('mainFactory', function($http){
  var factory = {};

  factory.getProfile = function() {
    return $http.get('/api/v1/me');
  };

  return factory;
});
