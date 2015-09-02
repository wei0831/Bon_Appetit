/**
 * Author: Jack Chang
 * Data: 07/31/2015
 */

var mongoose = require("mongoose");
var fs = require("fs");

module.exports = function(config) {

  mongoose.connect(config.server_DB);

  fs.readdirSync(config.models_path).forEach(function(file) {
    if (file.indexOf('.js') > 0) {
      require(config.models_path + '/' + file);
    }
  });
}
