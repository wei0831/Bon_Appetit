
var mongoose = require('mongoose'), 
Schema = mongoose.Schema;


// MEAL SCHEMA (additional Ingredients available as recipe as well)
var MealSchema = Schema({

	name: String,
	recipes: [{type: Schema.ObjectId, ref: 'Recipe'}],
	ingredients: [{type: Schema.ObjectId, ref: 'BaseIngredient'}],
	_menuID: [{type: Schema.ObjectId, ref: 'Menu'}],
	price: Number,
	picture: String,
	available: {type: Boolean, default: true},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}

})

MealSchema.path('name').required(true, 'name is required');
MealSchema.path('price').required(true, 'price is required');

mongoose.model('Meal', MealSchema)