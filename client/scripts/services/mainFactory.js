var app = angular.module('app');

app.factory('mainFactory', function($http, Restangular){
  var factory = {};

  factory.getProfile = function() {
    return $http.get('/api/v1/me');
  };

  var baseIngredients = Restangular.all('ingredients');

  factory.getIngredients = function(callback) {
    baseIngredients.getList()
    .then(function(result) {
      callback(result);
    });
  };



  return factory;
});
