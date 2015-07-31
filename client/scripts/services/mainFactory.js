var app = angular.module('app');

app.factory('mainFactory', function($http, Restangular){
  var factory = {};

  factory.getProfile = function() {
    return $http.get('/api/v1/me');
  };

/////////////////////////////
// ingredients
////////////////////////////
  var baseIngredients = Restangular.all('ingredients');

  factory.getIngredients = function(callback) {
    baseIngredients.getList()
    .then(function(result) {
      callback(result);
    });
  };

  factory.removeIngredient = function(id, callback) {
    baseIngredients.one(id).remove()
    .then(function(result) {
      callback(result);
    });
  };

  factory.addIngredient = function(newItem, callback){
    baseIngredients.post(newItem)
    .then(function(result) {
      callback(result);
    });
  };

  factory.updateIngredient = function(updatedItem, callback){
    Restangular.all('ingredients/' + updatedItem["_id"])
    .customPUT(updatedItem)
    .then(
      function(result){
        callback(result);
      }
    );
  };

  /////////////////////////////
  // Recipes
  ////////////////////////////

  return factory;
});
