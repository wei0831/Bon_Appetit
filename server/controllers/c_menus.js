/**
 * Author: Jack Chang
 * Data: 07/31/2015
 */

var mongoose = require('mongoose'),
		Meal = mongoose.model('Meal'),
		Menu = mongoose.model('Menu');

module.exports = (function(){

	return {
		show : function(req, res){
			Menu.find({})
			.populate('_meals')
			.exec(function(err, result){
				if(err) return res.status(400).send(err);
				res.status(200).json(result);
			});
		},
		getById : function(req, res){
			Menu.find({_id: req.params.id})
			.populate('_meals')
			.exec(function(err, result){
				if(err) return res.status(400).send(err);
				res.status(200).json(result);
			});
		},
		add : function(req, res){
			var newMenu = new Menu({
				name: req.body.name,
				_meals: req.body.mealIDs
			});

			newMenu.save(function(err){
				if(err) return res.status(400).send(err);

				// Add reference of this menu to each meal
				for(var i = 0; i < req.body.mealIDs.length; ++i){
					Meal.findOne({_id : req.body.mealIDs[i]}, function(err, result){
						if(err) return;
						if(!result) return;
						result._menus.addToSet(newMenu._id);
						result.save(function(err){
							if(err) return res.status(400).send(err);
						});
					});
				};
				res.sendStatus(201);
			});
		},
		destroy : function(req, res){
			Menu.findOne({_id: req.params.id}, function(err, menu){
				if(err) return res.status(400).send(err);
				if(!menu) return res.sendStatus(400);

				// Remove each Recipe's reference to this menu
				for(var i = 0; i < menu._meals.length; ++i){
					Meal.findOne({_id : menu._meals[i]}, function(err, meal){
						if(err) return;
						if(!meal) return;
						meal._menus.pull(menu._id);
						meal.save(function(err){
							if(err) return res.status(400).send(err);
						});
					});
				}

				menu.remove();
				res.sendStatus(200);
			});
		},
		update : function(req, res){
			Menu.findOne({_id: req.params.id}, function(err, menu){
				if(err) return res.status(400).send(err);
				if(!meal) return res.sendStatus(400);

				// Remove each Recipe's reference to this menu
				for(var i = 0; i < menu._meals.length; ++i){
					Meal.findOne({_id : menu._meals[i]}, function(err, meal){
						if(err) return;
						if(!recipe) return;
						meal._menus.pull(menu._id);
						meal.save(function(err){
							if(err) console.log("Error: Update Meal - Remove Reference");
						});
					});
				}

				// Update Menu
				menu.name = req.body.name;
				menu._meals = req.body.mealIDs;
				menu.updated_at = Date.now();

				menu.save(function(err){
					if(err) return res.status(400).send(err);

					// Add each Recipe's reference to this meal
					for(var i = 0; i < menu._meals.length; ++i){
						Meal.findOne({_id : menu._meals[i]}, function(err, meal){
							if(err) return;
							if(!recipe) return;
							meal._menus.addToSet(menu._id);
							meal.save(function(err){
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
