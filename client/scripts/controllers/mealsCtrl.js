var app = angular.module('app');

app.controller('mealsCtrl', function($state, $scope, $location, $auth, mainFactory, $window){
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


  mainFactory.getMeals(function(result) {
    console.log(result);
    $scope.meals = result;

    for (var i = 0; i < $scope.meals.length; ++i)
      $scope.models.lists.push($scope.meals[i]);
  });


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

  $scope.addmeal = function(){
     mainFactory.addMeal($scope.newItem, function(result){
      $window.location.reload();
    });
  }

  $scope.updatemeal = function(){
    mainFactory.updateMeal($scope.models.selected, function(result){
      $window.location.reload();
    });
  }








});
