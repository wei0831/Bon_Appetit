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
				picture: req.body.picture,
				category: req.body.category
			});

			newMeal.save(function(err){
				if(err) return res.status(400).json(err);

				// Add reference of this meal to each recipes
				for(var i = 0; i < req.body.recipeIDs.length; ++i){
					Recipe.findOne({_id : req.body.recipeIDs[i]}, function(err, result){
						if(err) return;
						if(!result) return;
						result._meals.addToSet(newMeal._id);
						result.save(function(err){
							if(err) return res.status(400).send(err);
						});
					});
				}

				res.sendStatus(201);
			});

		},
		destroy : function(req, res){
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
				res.sendStatus(200);
			});
		},
		update : function(req, res){
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
							if(err) console.log("Error: Update Meal - Remove Reference");
						});
					});
				}

				// Update Meal
				meal.name = req.body.name;
				meal._recipes = req.body.recipeIDs;
				meal.ingredients = req.body.ingredients;
				meal.price = req.body.price;
				meal.picture = req.body.picture;
				meal.category = req.body.category;
				meal.available = req.body.available;
				meal.updated_at = Date.now();

				meal.save(function(err){
					if(err) return res.status(400).send(err);

					// Add each Recipe's reference to this meal
					for(var i = 0; i < meal._recipes.length; ++i){
						Recipe.findOne({_id : meal._recipes[i]}, function(err, recipe){
							if(err) return;
							if(!recipe) return;
							recipe._meals.addToSet(meal._id);
							recipe.save(function(err){
								if(err) console.log("Error: Update Meal - Add Reference");
							});
						});
					}

					res.sendStatus(200);
				});
			});
		}

	}

})();
