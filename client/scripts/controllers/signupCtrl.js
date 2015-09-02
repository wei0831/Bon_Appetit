/**
 * Author: Jack Chang
 * Data: 07/31/2015
 */

var app = angular.module('app');

app.controller('signupCtrl', function($scope, $alert, $auth) {
  $scope.usersignup = function() {
    $auth.signup($scope.signup)
      .then(function(response) {

      })
      .catch(function(response) {
        if (typeof response.data.message === 'object') {
          angular.forEach(response.data.message, function(message) {
            $alert({
              content: message[0],
              animation: 'fadeZoomFadeDown',
              type: 'error',
              duration: 3
            });
          });
        } else {
          $alert({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'error',
            duration: 3
          });
        }
      });
  };
});
