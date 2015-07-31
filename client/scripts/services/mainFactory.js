var app = angular.module('app');

app.factory('mainFactory', function($http, Restangular, $window){
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
  var recipes = Restangular.all('recipe');

  factory.getRecipes = function(callback) {
    recipes.getList()
    .then(function(result) {
      callback(result);
    });
  };

  factory.removeRecipe = function(id, callback) {
    recipes.one(id).remove()
    .then(function(result) {
      callback(result);
    });
  };

  factory.addRecipe = function(newItem, callback){
    recipes.post(newItem)
    .then(function(result) {
      callback(result);
    });
  };

  factory.updateRecipe = function(updatedItem, callback){
    Restangular.all('recipe/' + updatedItem["_id"])
    .customPUT(updatedItem)
    .then(
      function(result){
        callback(result);
      }
    );
  };

  return factory;
});
