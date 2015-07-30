var app = angular.module('app');

app.controller('menusCtrl', function($state, $scope, $location, $auth){
  $scope.init = function(){
    $scope.sidenavList = [
      {name: "View All", data_state: "menus.view", data_icon: "icon icon-eye fs1"},
      {name: "Add Menus", data_state: "menus.add", data_icon: "icon icon-plus fs1"},
      {name: "Edit Menus", data_state: "menus.edit", data_icon: "icon icon-pencil2 fs1"},
      {name: "Remove Menus", data_state: "menus.remove", data_icon: "icon icon-bin fs1"}
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
