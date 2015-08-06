/**
 * Author: Jack Chang
 * Data: 07/31/2015
 */

var app = angular.module('app');

app.controller('logoutCtrl', function($auth, $state) {
  if (!$auth.isAuthenticated()) {
    return;
  }
  $auth.logout();
});
