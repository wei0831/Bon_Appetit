// Author: Malik Nur
// Date: 07/29/2015
// API Controller

var mongoose = require('mongoose');
var User = mongoose.model('User');
var secret = "ilovebanana";
var jwt = require('jsonwebtoken');
var request = require('request');
var moment = require('moment');

var Ingredient = mongoose.model('BaseIngredient');
var Recipe = mongoose.model('Recipe');
var Meal = mongoose.model('Meal');
var Menu = mongoose.model('Menu');

//function to remove unnessary attributes from JSON response
function sanitizeJSON(result) {
  for (var index in result) {
    result[index].created_at = undefined;
    result[index].updated_at = undefined;
    result[index].__v = undefined;

    if (result[index]._meals !== undefined) {

      for (var idx in result[index]._meals) {
        result[index]._meals[idx].created_at = undefined;
        result[index]._meals[idx].updated_at = undefined;
        result[index]._meals[idx].__v = undefined;
      }
    }

  }
  return result;
}

module.exports = (function() {
  return {
    test: function(req, res) {
      res.status(200).send({
        message: "This is just a test :D"
      });
    },

    /////////////////////////////////////////////
    // Recipe API
    ////////////////////////////////////////////

    recipeShowAll: function(req, res) {

      Recipe.find({})
        .exec(function(err, result) {
          if (err) return res.status(400).send(err);

          var result = sanitizeJSON(result);

          res.status(200).json(result);
          result = "";
        })
    },

    recipeShowOne: function(req, res) {

      Recipe.find({
          _id: req.params.id
        })
        .exec(function(err, result) {
          if (err) return res.status(400).send(err);

          var result = sanitizeJSON(result);

          res.status(200).json(result);
          result = "";
        })

    },

    recipeFindByName: function(req, res) {

      var name = req.query.name;

      Recipe.find({
          "name": new RegExp(name, "i")
        })
        .exec(function(err, result) {
          if (err) return res.status(400).send(err);

          var result = sanitizeJSON(result);

          res.status(200).json(result);
          result = "";

        })
    },

    /////////////////////////////////////////////
    // Ingredient API
    ////////////////////////////////////////////

    ingredientShowAll: function(req, res) {

      Ingredient.find({})
        .exec(function(err, result) {
          if (err) return res.status(400).send(err);

          var result = sanitizeJSON(result);

          res.status(200).json(result);
          result = "";
        })
    },

    ingredientShowOne: function(req, res) {

      Ingredient.find({
          _id: req.params.id
        })
        .exec(function(err, result) {
          if (err) return res.status(400).send(err);

          var result = sanitizeJSON(result);

          res.status(200).json(result);
          result = "";
        })

    },

    ingredientFindByName: function(req, res) {

      var name = req.query.name;

      Ingredient.find({
          "name": new RegExp(name, "i")
        })
        .exec(function(err, result) {
          if (err) return res.status(400).send(err);

          var result = sanitizeJSON(result);

          res.status(200).json(result);
          result = "";

        })
    },

    /////////////////////////////////////////////
    // Menu API
    ////////////////////////////////////////////
    menuShowAll: function(req, res) {

      Menu.find({})
        .populate('_meals')
        .exec(function(err, result) {
          if (err) return res.status(400).send(err);


          var result = sanitizeJSON(result);

          res.status(200).json(result);
          result = "";
        })
    },

    menuShowOne: function(req, res) {

      Menu.find({
          _id: req.params.id
        })
        .populate('_meals')
        .exec(function(err, result) {
          if (err) return res.status(400).send(err);

          var result = sanitizeJSON(result);

          res.status(200).json(result);
          result = "";
        })

    },

    menuFindByName: function(req, res) {

      var name = req.query.name;

      Menu.find({
          "name": new RegExp(name, "i")
        })
        .populate('_meals')
        .exec(function(err, result) {
          if (err) return res.status(400).send(err);

          var result = sanitizeJSON(result);

          res.status(200).json(result);
          result = "";

        })
    },

    /////////////////////////////////////////////
    // Meal API
    ////////////////////////////////////////////
    mealShowAll: function(req, res) {

      Meal.find({})
        .exec(function(err, result) {
          if (err) return res.status(400).send(err);

          var result = sanitizeJSON(result);

          res.status(200).json(result);
          result = "";
        })
    },

    mealShowOne: function(req, res) {

      Meal.find({
          _id: req.params.id
        })
        .exec(function(err, result) {
          if (err) return res.status(400).send(err);

          var result = sanitizeJSON(result);

          res.status(200).json(result);
          result = "";
        })

    },

    // reponse with NAME, CATEGORY or fixed PRICE query
    mealFindByName: function(req, res) {
      console.log(req.query);
      for (property in req.query) {

        var attrVal = property;
        var value = req.query[property];
      }

      // check if value as Number submitted
      if (attrVal == 'price' && parseInt(value)) {

        Meal.find({
            price: parseInt(value)
          })
          .exec(function(err, result) {
            if (err) return res.status(400).send(err);

            var result = sanitizeJSON(result);

            res.status(200).json(result);
            result = "";

          })

      }

      // check if value as String submitted
      if (!parseInt(value)) {
        Meal.find({
            $or: [{
              name: new RegExp(value, "i")
            }, {
              category: new RegExp(value, "i")
            }]

          })
          .exec(function(err, result) {
            if (err) return res.status(400).send(err);

            for (var index in result) {
              result[index].created_at = undefined;
              result[index].updated_at = undefined;
              result[index].__v = undefined;
            }

            res.status(200).json(result);
            result = "";

          })

      }

    },

    //check price range for MEAL, can accept MIN, MAX and both MIN and MAX ranges
    mealsPriceRange: function(req, res) {


      for (property in req.query) {


        var attrVal = property;
        if (attrVal == 'min') {
          var min = req.query[attrVal];
        }
        if (attrVal == 'max') {

          var max = req.query[attrVal];
        }
      }


      if (typeof max !== 'undefined' && parseInt(max) && max > 0 && typeof min == 'undefined') {
        Meal.find({
            price: {
              $lt: parseInt(max)
            }
          })
          .exec(function(err, result) {
            if (err) return res.status(400).send(err);

            var result = sanitizeJSON(result);

            res.status(200).json(result);

            result = "";
            max = undefined;

          })

      }

      if (typeof min !== 'undefined' && typeof max == 'undefined' && parseInt(min) || min >= 0) {
        Meal.find({
            price: {
              $gt: parseInt(min)
            }
          })
          .exec(function(err, result) {
            if (err) return res.status(400).send(err);

            var result = sanitizeJSON(result);

            res.status(200).json(result);

            result = "";
            min = undefined;

          })

      }


      if (typeof max !== 'undefined' && parseInt(max) && typeof min !== 'undefined' && parseInt(min)) {
        Meal.find({
            price: {
              $gt: parseInt(min),
              $lt: parseInt(max)
            }
          })
          .exec(function(err, result) {
            if (err) return res.status(400).send(err);

            var result = sanitizeJSON(result);

            res.status(200).json(result);
            result = "";
            max = undefined;
            min = undefined;

          })
      }
    }

  };
})();
