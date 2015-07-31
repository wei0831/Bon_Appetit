var app = angular.module('app');

app.controller('recipesCtrl', function($state, $scope, $location, $auth, mainFactory, $window){
  $scope.newItem = {};

  $scope.init = function(){
    $scope.sidenavList = [
      {name: "View All", data_state: "recipes.view", data_icon: "icon icon-eye fs1"},
      {name: "Add Recipes", data_state: "recipes.add", data_icon: "icon icon-plus fs1"},
      {name: "Edit Recipes", data_state: "recipes.edit", data_icon: "icon icon-pencil2 fs1"}
    ];
    $scope.state = $scope.sidenavList[0];
    $state.transitionTo($scope.state["data_state"]);

    $scope.isCollapsed = true;

    $scope.models = {
      selected: null,
      lists: [],
      recipes: [],
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

  $scope.changeState = function(item){
    $scope.state = item;
    $state.transitionTo($scope.state["data_state"]);
  }

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
      $scope.models.recipes.push($scope.recipes[i]);
  });
  // hard coded
  $scope.check = function() {
      if($scope.models.recycle.length > 0)
      {
        if($scope.models.selected && $scope.models.selected["_id"] == $scope.models.recycle[0]["_id"])
          $scope.models.selected = null;
        mainFactory.removeRecipe($scope.models.recycle[0]["_id"], function(result){
          $scope.models.recycle.pop();
        });
      }
  };

  $scope.$watch('ingredient_models', function(model) {
    $scope.ingredient_modelAsJson = angular.toJson(model, true);
  }, true);

  $scope.$watch('models', function(model) {
    $scope.modelAsJson = angular.toJson(model, true);
  }, true);

  $scope.add = function() {
    var newRecipe = {
      "name" : $scope.newItem.name,
      "picture" : $scope.newItem.picture,
      "ingredients" : []
    };

    for(var i = 0; i < $scope.models.lists.length; ++i) {
      newRecipe.ingredients.push({
        "_baseIngredient": $scope.models.lists[i]["_id"],
        "name": $scope.models.lists[i].name,
        "quantity": $scope.models.lists[i].quantity
      });
    }

    mainFactory.addRecipe(newRecipe, function(result){
      $window.location.reload();
    });
  }

  $scope.update = function(){
    mainFactory.updateRecipe($scope.models.selected, function(result){
      $window.location.reload();
    });
  }

});
