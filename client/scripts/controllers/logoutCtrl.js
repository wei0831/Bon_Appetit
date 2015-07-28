var app = angular.module('app');

app.controller('logoutCtrl', function($auth) {
  if (!$auth.isAuthenticated()) {
      return;
  }
  $auth.logout()
});
