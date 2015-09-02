/**
 * Author: Jack Chang
 * Data: 07/31/2015
 */

var app = angular.module('app');

app.controller('mainCtrl', function($state, $scope, $location, $auth) {
  $state.transitionTo('about.list');
});
