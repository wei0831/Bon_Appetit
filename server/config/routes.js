var users = require("../controllers/c_users.js");
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

  app.get('/api/v1/test', function(req, res) {
    api.test(req, res);
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
  // API MEAL
  /////////////////////////////////////

  app.get('/api/v1/meals/', function(req, res) {
  
  api.mealShowAll(req, res);

  });

  app.get('/api/v1/meals/q', function(req, res) {
    api.mealFindByName(req, res);
  });

  app.get('/api/v1/meals/p', function(req, res){
    api.mealsPriceRange(req, res);
  })

  app.get('/api/v1/meals/:id', function(req, res) {
    api.mealShowOne(req, res);
  });


  //////////////////////////////////////////////////////
  // Recipe
  //////////////////////////////////////////////////////
  app.post('/recipe', function(req, res){
    recipes.add(req, res);
  });

  app.get('/recipe', function(req, res){
    recipes.show(req, res);
  });

  app.get('/recipe/:id', function(req, res){
    recipes.getById(req, res);
  });

  app.delete('/recipe/:id', function(req, res){
    recipes.destroy(req, res);
  });

  app.put('/recipe/:id', function(req, res){
    recipes.update(req, res);
  });

  //////////////////////////////////////////////////////
  // Meal
  //////////////////////////////////////////////////////
  app.post('/meal', function(req, res){
    meals.add(req, res);
  });

  app.get('/meal', function(req, res){
    meals.show(req, res);
  });

  app.get('/meal/:id', function(req, res){
    meals.getById(req, res);
  });

  app.delete('/meal/:id', function(req, res){
    meals.destroy(req, res);
  });

  app.put('/meal/:id', function(req, res){
    meals.update(req, res);
  });

  //////////////////////////////////////////////////////
  // Menu
  //////////////////////////////////////////////////////
  app.post('/menu', function(req, res){
    menus.add(req, res);
  });

  app.get('/menu', function(req, res){
    menus.show(req, res);
  });

  app.get('/menu/:id', function(req, res){
    menus.getById(req, res);
  });

  app.delete('/menu/:id', function(req, res){
    menus.destroy(req, res);
  });

  app.put('/menu/:id', function(req, res){
    menus.update(req, res);
  });

};
