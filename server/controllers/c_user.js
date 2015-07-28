var mongoose = require('mongoose');
var User = mongoose.model('User');
var secret = "ilovebanana";
var jwt = require('jsonwebtoken');
var request = require('request');
var moment = require('moment');

module.exports = (function(){
    return {
      signup : function(req, res){
        User.findOne({ email: req.body.email }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'Email is already taken' });
          }
          var newUser = new User(req.body);
          newUser.save(function(err){
            if(err) return res.sendStatus(500);

            return res.status(200).send({token: jwt.sign(
              {
                sub: newUser._id,
                user_name: newUser.name,
                user_email: newUser.email,
                iat: moment().unix(),
                exp: moment().add(60, 'minutes').unix()
              },
              secret)});
          });
        });
      },

      login: function(req, res){
        var user_email = req.body.email;
        var user_pass = req.body.password;

        User.findOne({email: user_email}, function(err, result){

          if(result){
            if(user_pass != result.password){
              res.status(401).send({message: "Incorrect Password!"});
            }
            else{
              res.status(200).send({token: jwt.sign(
                {
                  sub: result._id,
                  user_name: result.name,
                  user_email: result.email,
                  iat: moment().unix(),
                  exp: moment().add(60, 'minutes').unix()
                },
                secret)});
            }
          }
          else{
            res.status(401).send({message: "No user found"});
          }
        })
      },

      ensureAuthenticated : function(req, res, next) {
        if (!req.headers.authorization) {
          return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
        }
        var token = req.headers.authorization.split(' ')[1];

        var payload = null;
        try {
          payload = jwt.decode(token, secret);
        }
        catch (err) {
          return res.status(401).send({ message: err.message });
        }

        if (payload.exp <= moment().unix()) {
          return res.status(401).send({ message: 'Token has expired' });
        }
        req.user = payload.sub;
        next();
      },

      getUser : function(req, res){

        User.findById(req.user, function(err, user) {
          if(err) return res.status(401).send();

          res.status(200).send({
            userid: user._id,
            username: user.username,
            email: user.email
          });
        });
      }

    }
})();
