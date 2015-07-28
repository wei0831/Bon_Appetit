var mongoose = require("mongoose");
var fs = require("fs");

module.exports = function(config) {
  mongoose.connect("mongodb://localhost/" + config.datebase_name);

  fs.readdirSync(config.models_path).forEach(function(file){
    if(file.indexOf('.js') > 0) {
      require(config.models_path + '/' + file);
    }
  });
}
