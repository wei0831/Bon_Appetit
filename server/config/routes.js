var users = require("../controllers/c_user.js");
var api = require("../controllers/c_api.js");

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

};
