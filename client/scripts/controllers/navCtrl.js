var app = angular.module('app');

app.controller('navCtrl', function($scope, $location, $auth){
  $scope.init = function(){
    $scope.navList = [
      {name: "About", href: "#/about"}
    ];
  };
  $scope.isActive = function(item) {
    return "#" + $location.$$url === item.href;
  };
  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
});
