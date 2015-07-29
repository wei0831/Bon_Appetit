// Author: Malik Nur
// Date: 07/27/2015
// Recipe Model

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// RECIPE SCHEMA (ingredients inside as nested objects)
var RecipeSchema = Schema({
	name: String,
	ingredients: ['Ingredient'],
	_meals:[{type: Schema.Types.ObjectId, ref:'Meal'}],
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
})

RecipeSchema.path('name').required(true, 'name is required');

mongoose.model('Recipe', RecipeSchema)
