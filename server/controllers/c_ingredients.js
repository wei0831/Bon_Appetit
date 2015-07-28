// INGREDIENT CONTROLLER
var mongoose = require('mongoose'),
		BaseIngredient = mongoose.model('BaseIngredient');

module.exports = (function(){

	return {
		
		show: function(req, res){
			BaseIngredient.find({}, function(err, results){
				if(err) return res.status(400).send(err);
				res.status(200).json(results)
			})
		},
		getById: function(req, res){
			BaseIngredient.find({_id: req.params.id},
				function(err, result){
					if(err) return res.status(400).send(err);
					res.status(200).json(result);
				}
			);
		},
		add: function(req, res){
			var newIngredient = BaseIngredient({
				name: req.body.name,
				calorie: req.body.calorie,
				picture: req.body.picture,
			});
			newIngredient.save(
				function(err){
					if(err) return res.status(400).send(err);
					res.sendStatus(200);
				}
			);
		},
		destroy: function(req, res){
			BaseIngredient.remove({_id: req.params.id},
				function(err){
					if(err) return res.status(400).send(err);
					res.sendStatus(200);
				}
			);
		},
		update: function(req, res){
			var query = {_id: req.params.id};
			var update = {
				$set: {
					name: req.body.name,
					calorie: req.body.calorie,
					picture: req.body.picture,
					updated_at: Date.now()
				}
			};
			var option = {upsert: false};

			BaseIngredient.findOneAndUpdate(query, update, option,
				function(err, result){
					if(err) return res.status(400).send(err);
					if(!result) return res.sendStatus(400);
					res.sendStatus(200);
				}
			);
		}
	};

})();
