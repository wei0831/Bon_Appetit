var app = angular.module('app');

app.controller('mealsCtrl', function($state, $scope, $location, $auth, mainFactory, $window){

  $scope.newItem = {};

  $scope.init = function(){
    $scope.sidenavList = [
      {name: "View All", data_state: "meals.view", data_icon: "icon icon-eye fs1"},
      {name: "Add Meals", data_state: "meals.add", data_icon: "icon icon-plus fs1"},
      {name: "Edit Meals", data_state: "meals.edit", data_icon: "icon icon-pencil2 fs1"}
    ];
    $scope.state = $scope.sidenavList[0];
    $state.transitionTo($scope.state["data_state"]);

    $scope.isCollapsed = true;

    $scope.categories = [{name: "dessert"}, 
                        {name: "soup"}, 
                        {name: "fastfood"},
                        {name: "salad"},
                        {name: "snack"},
                        {name: "drink"},
                        {name: "sides"},
                        {name: "appetizer"},
                        {name: "sauces"},
                        {name: "entrees"},
                        {name: "steak"},
                        {name: "sandwich"}

                        ];
    $scope.models = {
      selected: null,
      lists_ingredient: [],
      lists_recipes: [],
      meals: [],
      recycle: []
    };
    $scope.recipe_models = {
      selected: null,
      lists: [],
      recycle: []
    };
    $scope.ingredient_models = {
      selected: null,
      lists: [],
      recycle: []
    };
  };


  $scope.isActive = function(item) {
    return item === $scope.state;
  };

  $scope.changeState = function(item) {
    $scope.state = item;
    $state.transitionTo($scope.state["data_state"]);
  };

  mainFactory.getIngredients(function(result) {
    $scope.ingredients = result;

    for (var i = 0; i < $scope.ingredients.length; ++i)
      $scope.ingredient_models.lists.push(
        {
          "name": $scope.ingredients[i].name,
          "_baseIngredient": $scope.ingredients[i]._id,
          "picture": $scope.ingredients[i].picture,
          "calorie": $scope.ingredients[i].calorie,
          "quantity": ""
        }
      );
  });

  mainFactory.getRecipes(function(result) {
    $scope.recipes = result;

    for (var i = 0; i < $scope.recipes.length; ++i)
      $scope.recipe_models.lists.push($scope.recipes[i]);
  });

  mainFactory.getMeals(function(result) {
    $scope.meals = result;

    for (var i = 0; i < $scope.meals.length; ++i)
      $scope.models.meals.push($scope.meals[i]);
  });
  // hard coded
  $scope.check = function() {
      if($scope.models.recycle.length > 0)
      {
        if($scope.models.selected && $scope.models.selected["_id"] == $scope.models.recycle[0]["_id"])
          $scope.models.selected = null;
        mainFactory.removeIngredient($scope.models.recycle[0]["_id"], function(result){
          $scope.models.recycle.pop();
        });
      }
  };
  $scope.$watch('models', function(model) {
    $scope.modelAsJson = angular.toJson(model, true);
  }, true);
  $scope.$watch('recipe_models', function(model) {
    $scope.recipe_modelAsJson = angular.toJson(model, true);
  }, true);
  $scope.$watch('ingredient_models', function(model) {
    $scope.ingredient_modelAsJson = angular.toJson(model, true);
  }, true);

  $scope.add = function(){
    var newMeal = {
      "name" : $scope.newItem.name,
      "price" : $scope.newItem.price,
      "picture" : $scope.newItem.picture,
      "category" : $scope.newItem.category.name,
      "ingredients" : [],
      "recipeIDs" : []
    };

    for(var i = 0; i < $scope.models.lists_ingredient.length; ++i) {
      newMeal.ingredients.push({
        "_baseIngredient": $scope.models.lists_ingredient[i]._baseIngredient,
        "name": $scope.models.lists_ingredient[i].name,
        "quantity": $scope.models.lists_ingredient[i].quantity
      });
    }

    for(var i = 0; i < $scope.models.lists_recipes.length; ++i) {
      newMeal.recipeIDs.push($scope.models.lists_recipes[i]._id);
    }

    mainFactory.addMeal(newMeal, function(result){
      console.log(result);
      $window.location.reload();
    });
  }



  $scope.update = function(){

    mainFactory.updateMeal($scope.models.selected, function(result){
      $window.location.reload();
    });
  }

});
