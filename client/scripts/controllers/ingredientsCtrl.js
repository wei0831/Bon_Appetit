var app = angular.module('app');

app.controller('ingredientsCtrl', function($state, $scope, $location, $auth, mainFactory, $window) {
  $scope.newItem = {};

  $scope.init = function() {
    $scope.sidenavList = [{
      name: "View All",
      data_state: "ingredients.view",
      data_icon: "icon icon-eye fs1"
    }, {
      name: "Add Ingredients",
      data_state: "ingredients.add",
      data_icon: "icon icon-plus fs1"
    }, {
      name: "Edit Ingredietns",
      data_state: "ingredients.edit",
      data_icon: "icon icon-pencil2 fs1"
    }, {
      name: "Remove Ingredietns",
      data_state: "ingredients.remove",
      data_icon: "icon icon-bin fs1"
    }];
    $scope.state = $scope.sidenavList[0];
    $state.transitionTo($scope.state["data_state"]);

    $scope.isCollapsed = true;

    $scope.models = {
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
      $scope.models.lists.push($scope.ingredients[i]);
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

  $scope.addproduct = function(){
    mainFactory.addIngredient($scope.newItem, function(result){
      $window.location.reload();
    });
  }

  $scope.updateproduct = function(){
    mainFactory.updateIngredient($scope.models.selected, function(result){
      $window.location.reload();
    });
  }

});
