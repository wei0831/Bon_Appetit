// Author: Jack Chang
// Date: 07/28/2015
// Recipe Controller

var mongoose = require('mongoose')

var Recipe = mongoose.model('Recipe')

module.exports = (function(){

	return {

		show : function(req, res){
			Recipe.find({})
			.exec(function(err, result){
				if(err) return res.status(400).send(err);
				res.status(200).json(result);
			});
		},
		getById : function(req, res){
			Recipe.find({_id: req.params.id})
			.exec(function(err, result){
				if(err) return res.status(400).send(err);
				res.status(200).json(result);
			});
		},
		add : function(req, res){
			var newRecipe = new Recipe({
				name: req.body.name,
				ingredients: req.body.ingredients,
				_recipes: req.body.recipeIDs
			});

			newRecipe.save(function(err){
				if(err) return res.status(400).send(err);
				res.sendStatus(201);
			});
		},
		destroy : function(req, res){
			Recipe.remove({_id: req.params.id}, function(err, result){
				if(err) return res.status(400).send(err);
				res.sendStatus(200);
			});
		},
		update : function(req, res){
			var query = {_id: req.params.id};
			var update = {
				$set: {
					name: req.body.name,
					ingredients: req.body.ingredients,
					_meals: req.body.mealIDs,
					updated_at: Date.now()
				}
			};
			var option = {upsert: false};

			Recipe.findOneAndUpdate(query, update, option,
				function(err, result){
					if(err) return res.status(400).send(err);
					if(!result) return res.sendStatus(400);
					res.sendStatus(200);
				}
			);
		}

	}

})();
