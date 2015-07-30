var app = angular.module('app');

app.controller('dashboardCtrl', function($state, $scope, $location, $auth){
  $scope.init = function(){
    $scope.sidenavList = [
      {name: "Menus", data_state: "dashboard.menu", data_icon: "icon icon-bowl-17 fs1"},
      {name: "Meals", data_state: "dashboard.meal", data_icon: "icon icon-cooking-1 fs1"},
      {name: "Recipes", data_state: "dashboard.recipe", data_icon: "icon icon-recipes-3 fs1"},
      {name: "Ingredients", data_state: "dashboard.ingredient", data_icon: "icon icon-cutting-board3 fs1"}
    ];
    $scope.state = $scope.sidenavList[0];
    $state.transitionTo($scope.state["data_state"]);
  };

  $scope.isActive = function(item) {
    return item === $scope.state;
  };

  $scope.changeState = function(item){
    $scope.state = item;
    $state.transitionTo($scope.state["data_state"]);
  }

});
