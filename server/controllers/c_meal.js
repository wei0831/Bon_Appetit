// Author: Jack Chang
// Date: 07/28/2015
// Meal Controller

var mongoose = require('mongoose'),
		Meal = mongoose.model('Meal'),
		Recipe = mongoose.model('Recipe');

module.exports = (function(){

	return {
		show : function(req, res){
			Meal.find({})
			.populate('_recipes')
			.exec(function(err, result){
				if(err) return res.status(400).send(err);
				res.status(200).json(result);
			});
		},
		getById : function(req, res){
			Meal.find({_id: req.params.id})
			.populate('_recipes')
			.exec(function(err, result){
				if(err) return res.status(400).send(err);
				res.status(200).json(result);
			});
		},
		add : function(req, res){
			var newMeal = new Meal({
				name: req.body.name,
				_recipes: req.body.recipeIDs,
				ingredients: req.body.ingredients,
				price: req.body.price,
				picture: req.body.picture
			});

			for(var i = 0; i < req.body.recipeIDs.length; ++i){
				Recipe.findOne({_id : req.body.recipeIDs[i]}, function(err, result){
					result._meals.addToSet(newMeal._id);
					result.save(function(err){
						if(err) return res.status(400).send(err);
					});
				});
			}

			newMeal.save(function(err){
				if(err) return res.status(400).send(err);
			});

			res.sendStatus(201);
		},
		destory : function(req, res){
			Meal.findOne({_id: req.params.id}, function(err, meal){
				if(err) return res.status(400).send(err);
				if(!meal) return res.sendStatus(400);

				// Remove each Recipe's reference to this meal
				for(var i = 0; i < meal._recipes.length; ++i){
					Recipe.findOne({_id : meal._recipes[i]}, function(err, recipe){
						if(err) return;
						if(!recipe) return;
						recipe._meals.pull(meal._id);
						recipe.save(function(err){
							if(err) return res.status(400).send(err);
						});
					});
				}

				meal.remove();
				return res.sendStatus(200);
			});
		},
		update : function(req, res){
			var query = {_id: req.params.id};
			var update = {
				$set: {
					name: req.body.name,
					_recipes: req.body.recipeIDs,
					ingredients: req.body.ingredients,
					price: req.body.price,
					picture: req.body.picture,
					available: req.body.available,
					updated_at: Date.now()
				}
			};
			var option = {upsert: false};

			Meal.findOneAndUpdate(query, update, option,
				function(err, result){
					if(err) return res.status(400).send(err);
					if(!result) return res.sendStatus(400);
					res.sendStatus(200);
				}
			);
		}

	}

})();
