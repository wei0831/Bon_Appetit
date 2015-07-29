// MENU CONTROLLER

var mongoose = require('mongoose')

var Menu = mongoose.model('Menu')

module.exports = (function(){


	return {

		showAll: function(req, res){
			Menu.find({}, function(err, results){
				if(err) {res.json(err)}
					else{
						res.json(results)
					}
			})
		},

		getById: function(req, res){
			Menu.find({_id: req.params.id}, function(err, result){
				if(err) {res.json(err)}
					else {
						res.json(result)
					}
			})
		},

		add: function(req, res){

			var newMenu = Menu({

				name: req.body.name,
				meals: req.body.meals

			})
		},

		destory: function(req, res){

			Menu.remove({_id: req.params.id}, function(err){
				if(err) { res.json(err)}
					else {
						res.json(true)
					}
			})
		},


		update: function(req, res){

			var query = {_id: req.params.id}
			var update = { $set: {
				name: req.body.name,
				meals: req.body.meals,
				updated_at: Date.now

			}}
			var options = {upsert: true}

			Menu.findOneAndUpdate(query, update, option, function(err, result){
				if(err) {res.json(err)}
					else {
						res.json(result)
					}
			})
		}

	}

})()