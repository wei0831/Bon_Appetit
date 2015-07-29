var users = require("../controllers/c_user.js");
var recipes = require("../controllers/c_recipe.js");
var meals = require("../controllers/c_meal.js");
var menus = require("../controllers/c_menu.js");
var api = require("../controllers/c_api.js");
var igredients = require("../controllers/c_ingredients.js");
var menus = require("../controllers/c_menus.js");

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
    recipes.destory(req, res);
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
    meals.destory(req, res);
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
    menus.destory(req, res);
  });

  app.put('/menu/:id', function(req, res){
    menus.update(req, res);
  });

};
