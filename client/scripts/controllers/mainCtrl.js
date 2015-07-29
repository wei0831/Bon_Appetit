var app = angular.module('app');

app.controller('mainCtrl', function($state, $scope, $location, $auth){
  $state.transitionTo('about.list');
});
