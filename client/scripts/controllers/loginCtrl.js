var app = angular.module('app');

app.controller('loginCtrl', function($scope, $auth, $alert) {

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
    .then(function() {
      $alert({
        content: 'You have successfully logged in',
        animation: 'fadeZoomFadeDown',
        type: 'material',
        duration: 3
      });
    })
    .catch(function(response) {
      $alert({
        content: response.data ? response.data.message : response,
        animation: 'fadeZoomFadeDown',
        type: 'material',
        duration: 3
      });
    });
  };

  $scope.userlogin = function() {
    $auth.login($scope.login)
    .then(function(response) {
     
    })
    .catch(function(response) {
      
      $alert({
        content: response.data.message,
        animation: 'fadeZoomFadeDown',
        type: 'error',
        duration: 3
      });
    });
  };

});
