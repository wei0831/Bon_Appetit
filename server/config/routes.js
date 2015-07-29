var users = require("../controllers/c_user.js");
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

  //ingredients routes

  app.get('/api/v1/igredients', function(req, res){
    igredients.showAll(req, res);
  });

  app.get('/api/v1/igredients/:id', function(req, res){
    igredients.getById(req, res);
  });

  app.post('/api/v1/igredients/destroy/:id', users.ensureAuthenticated, function(req, res){
    ingredients.destory(req, res);
  });

  app.post('/api/v1/igredients/add', users.ensureAuthenticated, function(req, res){
    ingredients.add(req, res);
  });

  app.post('/api/v1/igredients/update/:id', users.ensureAuthenticated, function(req, res){
    ingredients.update(req, res);
  })


  //menu routes

  app.get('/api/v1/menus', function(req, res){
    menus.showAll(req, res);
  });

  app.get('/api/v1/menus/:id', function(req, res){
    menus.getById(req, res);
  });

  app.post('/api/v1/menus/destory/:id', users.ensureAuthenticated, function(req, res){
    menus.destory(req, res);
  });

  app.post('/api/v1/menus/add', users.ensureAuthenticated,  function(req, res){
    menus.add(req, res);
  });

  app.post('/api/v1/menus/update/:id', users.ensureAuthenticated, function(req, res){
    menus.update(req, res);
  } );



};
