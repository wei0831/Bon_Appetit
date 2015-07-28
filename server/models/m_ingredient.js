var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

//  BASE SINGLE INGREDIENT
var BaseIngredientSchema = Schema({
	name: String,
	calorie: Number,
	picture: String,
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	_recipeID: [{type: Schema.ObjectId, ref:'Recipe'}]

});

BaseIngredientSchema.path('name').required(true, 'name is required');

// INGREDIENT
var IngredientSchema = Schema({
	_baseIngredient: {type: Schema.ObjectId, ref: 'BaseIngredient'},
	name: String,
	quantity: Number
});

IngredientSchema.path('name').required(true, 'name is required');
IngredientSchema.path('quantity').required(true, 'quantity is required');

// INVENTORY INGREDIENT

var InventoryIngredientSchema = Schema({
	_baseIngredient: {type: Schema.ObjectId, ref: 'BaseIngredient'},
	whereFrom: String,
	quantity: Number,
	price: Number,
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
});

InventoryIngredientSchema.path('quantity').required(true, 'quantity is required');

InventoryIngredientSchema.path('price').required(true, 'price is required');


mongoose.model('BaseIngredient', BaseIngredientSchema);
mongoose.model('Ingredient', IngredientSchema);
mongoose.model('InventoryIngredient', InventoryIngredientSchema);
