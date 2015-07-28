// INGREDIENT CONTROLLER

var mongoose = require('mongoose')

var BaseIngredient = mongoose.model('BaseIngredient')

module.exports = (function(){


	return {

		showAll: function(req, res){
			BaseIngredient.find({}, function(err, results){
				if(err) {res.json(err)}
					else {
						res.json(results)
					}
			})
		},

		getById: function(req, res){
			BaseIngredient.find({_id: req.params.id}, function(err, result){
				if(err) {res.json(err)}
					else {
						res.json(result)
					}

			})
		},


		add: function(req, res){

			var newIngredient = BaseIngredient({
				name: req.body.name,
				calorie: req.body.calorie,
				picture: req.body.picture,	
			})

			newIngredient.save(function(err){
				if(err){ console.log('ingredient add failed')}
					else{
						res.json(true)
					}
			})
		},

		destroy: function(req, res){

			BaseIngredient.remove({_id: req.params.id}, function(err){
				if(err){ console.log('ingredient delete error')}
					else{
						res.json(true)
					}
			})


		},

		update: function(req, res){

			var query = {_id: req.params.id}
			
			var update = { $set: {
				name: req.body.name,
				calorie: req.body.calorie,
				picture: req.body.picture,
				updated_at: Date.now
			}}
			var option = {upsert: true}

			BaseIngredient.findOneAndUpdate(query, update, option, function(err, result){
				if(err) { res.json(err) }
					else{
						res.json(result)
					}
			})

		}




	}



})();

