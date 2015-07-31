var app = angular.module('app');

app.controller('recipesCtrl', function($state, $scope, $location, $auth){
  $scope.init = function(){
    $scope.sidenavList = [
      {name: "View All", data_state: "recipes.view", data_icon: "icon icon-eye fs1"},
      {name: "Add Meals", data_state: "recipes.add", data_icon: "icon icon-plus fs1"},
      {name: "Edit Meals", data_state: "recipes.edit", data_icon: "icon icon-pencil2 fs1"},
      {name: "Remove Meals", data_state: "recipes.remove", data_icon: "icon icon-bin fs1"}
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
