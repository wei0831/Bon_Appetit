/**
 * Author: Jack Chang
 * Data: 07/31/2015
 */

var app = angular.module('app');

app.factory('mainFactory', function($http, Restangular, $window) {
  var factory = {};

  factory.getProfile = function() {
    return $http.get('/api/v1/me');
  };

  /////////////////////////////
  // Ingredients
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

  factory.addIngredient = function(newItem, callback) {
    baseIngredients.post(newItem)
      .then(function(result) {
        callback(result);
      });
  };

  factory.updateIngredient = function(updatedItem, callback) {
    Restangular.all('ingredients/' + updatedItem["_id"])
      .customPUT(updatedItem)
      .then(
        function(result) {
          callback(result);
        }
      );
  };

  /////////////////////////////
  // Recipes
  ////////////////////////////
  var recipes = Restangular.all('recipes');

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

  factory.addRecipe = function(newItem, callback) {
    recipes.post(newItem)
      .then(function(result) {
        callback(result);
      });
  };

  factory.updateRecipe = function(updatedItem, callback) {
    Restangular.all('recipes/' + updatedItem["_id"])
      .customPUT(updatedItem)
      .then(
        function(result) {
          callback(result);
        }
      );
  };

  /////////////////////////////
  // Meals
  ////////////////////////////
  var meals = Restangular.all('meals');

  factory.getMeals = function(callback) {
    meals.getList()
      .then(function(result) {
        callback(result);
      });
  };

  factory.removeMeal = function(id, callback) {
    meals.one(id).remove()
      .then(function(result) {
        callback(result);
      });
  };

  factory.addMeal = function(newItem, callback) {
    console.log(newItem);
    meals.post(newItem)
      .then(function(result) {
        callback(result);
      });
  };

  factory.updateMeal = function(updatedItem, callback) {
    Restangular.all('meals/' + updatedItem["_id"])
      .customPUT(updatedItem)
      .then(
        function(result) {
          callback(result);
        }
      );
  };

  /////////////////////////////
  // Menus
  ////////////////////////////
  var menus = Restangular.all('menus');

  factory.getMenus = function(callback) {
    menus.getList()
      .then(function(result) {
        callback(result);
      });
  };

  factory.removeMenu = function(id, callback) {
    menus.one(id).remove()
      .then(function(result) {
        callback(result);
      });
  };

  factory.addMenu = function(newItem, callback) {
    console.log(newItem);
    menus.post(newItem)
      .then(function(result) {
        callback(result);
      });
  };

  factory.updateMenu = function(updatedItem, callback) {
    Restangular.all('menus/' + updatedItem["_id"])
      .customPUT(updatedItem)
      .then(
        function(result) {
          callback(result);
        }
      );
  };

  return factory;
});
