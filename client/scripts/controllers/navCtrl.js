var app = angular.module('app');

app.controller('navCtrl', function($scope, $location, $auth){
  $scope.init = function(){
    $scope.navList = [
      {name: "About", href: "#/about"},
      {name: "Dashboard", href: "#/dashboard"},
      {name: "Menu", href:"#/menu"},
      {name: "Meals", href: "#/meals"},
      {name: "Ingredients", href: "#/ingredients"}
    ];
  };
  $scope.isActive = function(item) {
    return "#" + $location.$$url === item.href;
  };
  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
});
