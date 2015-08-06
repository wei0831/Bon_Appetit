/**
 * Author: Jack Chang
 * Data: 07/31/2015
 */

var users = require("../controllers/c_users.js");
var ingredients = require("../controllers/c_ingredients.js");
var recipes = require("../controllers/c_recipes.js");
var meals = require("../controllers/c_meals.js");
var menus = require("../controllers/c_menus.js");
var api = require("../controllers/c_api.js");
var igredients = require("../controllers/c_ingredients.js");

module.exports = function(app) {

  app.post('/auth/login', function(req, res) {
    users.login(req, res);
  });

  app.post('/auth/signup', function(req, res) {
    users.signup(req, res);
  });

  app.get('/api/v1/me', users.ensureAuthenticated, function(req, res) {
    users.getUser(req, res);
  });

  //////////////////////////////////////
  // API RECIPE
  /////////////////////////////////////
  app.get('/api/v1/recipes/', function(req, res) {
    api.recipeShowAll(req, res);
  });

  app.get('/api/v1/recipes/q', function(req, res) {
    api.recipeFindByName(req, res);
  });

  app.get('/api/v1/recipes/:id', function(req, res) {
    api.recipeShowOne(req, res);
  });

  //////////////////////////////////////
  // API INGREDIENTS
  /////////////////////////////////////
  app.get('/api/v1/ingredients/', function(req, res) {
    api.ingredientShowAll(req, res);
  });

  app.get('/api/v1/ingredients/q', function(req, res) {
    api.ingredientFindByName(req, res);
  });

  app.get('/api/v1/ingredients/:id', function(req, res) {
    api.ingredientShowOne(req, res);
  });

  //////////////////////////////////////
  // API MENUS
  /////////////////////////////////////
  app.get('/api/v1/menus/', function(req, res) {
    api.menuShowAll(req, res);
  });

  app.get('/api/v1/menus/q', function(req, res) {
    api.menuFindByName(req, res);
  });

  app.get('/api/v1/menus/:id', function(req, res) {
    api.menuShowOne(req, res);
  });

  //////////////////////////////////////
  // API MEAL
  /////////////////////////////////////
  app.get('/api/v1/meals/', function(req, res) {
    api.mealShowAll(req, res);
  });

  app.get('/api/v1/meals/q', function(req, res) {
    api.mealFindByName(req, res);
  });

  app.get('/api/v1/meals/p', function(req, res) {
    api.mealsPriceRange(req, res);
  })

  app.get('/api/v1/meals/:id', function(req, res) {
    api.mealShowOne(req, res);
  });

  //////////////////////////////////////////////////////
  // Ingredient
  //////////////////////////////////////////////////////
  app.post('/ingredients', function(req, res) {
    ingredients.add(req, res);
  });

  app.get('/ingredients', function(req, res) {
    ingredients.show(req, res);
  });

  app.get('/ingredients/:id', function(req, res) {
    ingredients.getById(req, res);
  });

  app.delete('/ingredients/:id', function(req, res) {
    ingredients.destroy(req, res);
  });

  app.put('/ingredients/:id', function(req, res) {
    ingredients.update(req, res);
  });

  //////////////////////////////////////////////////////
  // Recipe
  //////////////////////////////////////////////////////
  app.post('/recipes', function(req, res) {
    recipes.add(req, res);
  });

  app.get('/recipes', function(req, res) {
    recipes.show(req, res);
  });

  app.get('/recipes/:id', function(req, res) {
    recipes.getById(req, res);
  });

  app.delete('/recipes/:id', function(req, res) {
    recipes.destroy(req, res);
  });

  app.put('/recipes/:id', function(req, res) {
    recipes.update(req, res);
  });

  //////////////////////////////////////////////////////
  // Meal
  //////////////////////////////////////////////////////
  app.post('/meals', function(req, res) {
    meals.add(req, res);
  });

  app.get('/meals', function(req, res) {
    meals.show(req, res);
  });

  app.get('/meals/:id', function(req, res) {
    meals.getById(req, res);
  });

  app.delete('/meals/:id', function(req, res) {
    meals.destroy(req, res);
  });

  app.put('/meals/:id', function(req, res) {
    meals.update(req, res);
  });

  //////////////////////////////////////////////////////
  // Menu
  //////////////////////////////////////////////////////
  app.post('/menus', function(req, res) {
    menus.add(req, res);
  });

  app.get('/menus', function(req, res) {
    menus.show(req, res);
  });

  app.get('/menus/:id', function(req, res) {
    menus.getById(req, res);
  });

  app.delete('/menus/:id', function(req, res) {
    menus.destroy(req, res);
  });

  app.put('/menus/:id', function(req, res) {
    menus.update(req, res);
  });

};
