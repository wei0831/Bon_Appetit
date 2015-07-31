// Author: Jack Chang
// Date: 07/28/2015
// Recipe Controller

var mongoose = require('mongoose');

var Recipe = mongoose.model('Recipe');
var Ingredient = mongoose.model('BaseIngredient');

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
				picture: req.body.picture
			});

			// Add reference of this recipe to each baseIngredients
			for(var i = 0; i < req.body.ingredients.length; ++i){
				Ingredient.findOne({_id : req.body.ingredients[i]._baseIngredient}, function(err, result){
					if(err) return;
					if(!result) return;
					result._recipeID.addToSet(newRecipe._id);
					result.save(function(err){
						if(err) console.log("Error: Add Recipe - Add Reference");
					});
				});
			}

			newRecipe.save(function(err){
				if(err) return res.status(400).send(err);
				res.sendStatus(201);
			});
		},
		destroy : function(req, res){
			Recipe.findOne({_id: req.params.id}, function(err, recipe){
				if(err) return res.status(400).send(err);
				if(!recipe) return res.sendStatus(400);

				for(var i = 0; i < recipe.ingredients.length; ++i){
					Ingredient.findOne({_id : recipe.ingredients[i]._baseIngredient}, function(err, ingredient){
						if(err) return;
						if(!ingredient) return;
						ingredient._recipeID.pull(recipe._id);
						ingredient.save(function(err){
							if(err) return res.status(400).send(err);
						});
					});
				}

				recipe.remove();
				res.sendStatus(200);
			});
		},
		update : function(req, res){
			Recipe.findOne({_id: req.params.id}, function(err, recipe){
				if(err) return res.status(400).send(err);
				if(!recipe) return res.sendStatus(400);

				for(var i = 0; i < recipe.ingredients.length; ++i){
					Ingredient.findOne({_id : recipe.ingredients[i]._baseIngredient}, function(err, ingredient){
						if(err) return;
						if(!ingredient) return;
						ingredient._recipeID.pull(recipe._id);
						ingredient.save(function(err){
							if(err) console.log("Error: Update Recipe - Remove Reference");
						});
					});
				}

				// Update Recipe
				recipe.name = req.body.name,
				recipe.ingredients = req.body.ingredients,
				recipe.picture = req.body.picture,
				recipe.updated_at = Date.now()

				recipe.save(function(err){
					if(err) return res.status(400).send(err);

					for(var i = 0; i < recipe.ingredients.length; ++i){
						Ingredient.findOne({_id : recipe.ingredients[i]._baseIngredient}, function(err, ingredient){
							if(err) return;
							if(!ingredient) return;
							ingredient._recipeID.addToSet(recipe._id);
							ingredient.save(function(err){
								if(err) console.log("Error: Update Recipe - Add Reference");
							});
						});
					}

					res.sendStatus(200);
				});
			});
		}
	}

})();
