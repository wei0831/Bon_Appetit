var app = angular.module('app');

app.controller('userCtrl', function($scope, $alert, mainFactory) {

  $scope.getProfile = function() {
    boardFactory.getProfile()
      .success(function(data) {
        $scope.user = data;
      })
      .error(function(error) {
        $alert({
          content: error.message,
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      });
  };

  $scope.getProfile();

});
