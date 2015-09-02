/**
 * Author: Jack Chang
 * Data: 07/31/2015
 */

var app = angular.module('app');

app.controller('loginCtrl', function($scope, $auth, $alert, $state) {

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
        $state.go('dashboard');
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
