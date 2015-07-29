var mongoose = require("mongoose");
var fs = require("fs");

module.exports = function(config) {

  mongoose.connect("mongodb://"+config.user+"@"+config.url+"/"+config.dbname);

  fs.readdirSync(config.models_path).forEach(function(file){
    if(file.indexOf('.js') > 0) {
      require(config.models_path + '/' + file);
    }
  });
}
