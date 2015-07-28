var mongoose = require('mongoose');
var User = mongoose.model('User');
var secret = "ilovebanana";
var jwt = require('jsonwebtoken');
var request = require('request');
var moment = require('moment');

module.exports = (function(){
    return {
      test : function(req, res){
          res.status(200).send({message: "This is just a test :D"});
      }
    };
})();
