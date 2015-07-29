
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// MENU SCHEMA (all available meals eg.Business lunch, dinner)
var MenuSchema = Schema({

	name: String,
	_meals:[{type: Schema.Types.ObjectId, ref:'Meal'}],
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
})

MenuSchema.path('name').required(true, 'name is required');

mongoose.model('Menu', MenuSchema)
