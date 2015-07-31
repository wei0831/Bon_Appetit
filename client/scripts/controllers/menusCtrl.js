var app = angular.module('app');

app.controller('menusCtrl', function($state, $scope, $location, $auth, mainFactory, $window){
  $scope.newItem = {};

  $scope.init = function(){
    $scope.sidenavList = [
      {name: "View All", data_state: "menus.view", data_icon: "icon icon-eye fs1"},
      {name: "Add Menus", data_state: "menus.add", data_icon: "icon icon-plus fs1"},
      {name: "Edit Menus", data_state: "menus.edit", data_icon: "icon icon-pencil2 fs1"}
    ];
    $scope.state = $scope.sidenavList[0];
    $state.transitionTo($scope.state["data_state"]);

    $scope.isCollapsed = true;

    $scope.models = {
      selected: null,
      lists_menus : [],
      meals: [],
      recycle: []
    };
  };

  $scope.isActive = function(item) {
    return item === $scope.state;
  };

  $scope.changeState = function(item){
    $scope.state = item;
    $state.transitionTo($scope.state["data_state"]);
  }

    mainFactory.getMenus(function(result) {
      $scope.menus = result;

      for (var i = 0; i < $scope.menus.length; ++i)
        $scope.models.lists_menus.push($scope.menus[i]);
    });

    // hard coded
    $scope.check = function() {
        if($scope.models.recycle.length > 0)
        {
          if($scope.models.selected && $scope.models.selected["_id"] == $scope.models.recycle[0]["_id"])
            $scope.models.selected = null;
          mainFactory.removeMenu($scope.models.recycle[0]["_id"], function(result){
            $scope.models.recycle.pop();
          });
        }
    };
    $scope.$watch('models', function(model) {
      $scope.modelAsJson = angular.toJson(model, true);
    }, true);

    $scope.add = function(){
      // var newMeal = {
      //   "name" : $scope.newItem.name,
      //   "price" : $scope.newItem.price,
      //   "picture" : $scope.newItem.picture,
      //   "category" : $scope.newItem.category,
      //   "ingredients" : [],
      //   "recipeIDs" : []
      // };
      //
      // for(var i = 0; i < $scope.models.lists_ingredient.length; ++i) {
      //   newMeal.ingredients.push({
      //     "_baseIngredient": $scope.models.lists_ingredient[i]._baseIngredient,
      //     "name": $scope.models.lists_ingredient[i].name,
      //     "quantity": $scope.models.lists_ingredient[i].quantity
      //   });
      // }
      //
      // for(var i = 0; i < $scope.models.lists_recipes.length; ++i) {
      //   newMeal.recipeIDs.push($scope.models.lists_recipes[i]._id);
      // }
      //
      // mainFactory.addMeal(newMeal, function(result){
      //   console.log(result);
      //   $window.location.reload();
      // });
    }

    $scope.update = function(){
      // mainFactory.updateMeal($scope.models.selected, function(result){
      //   $window.location.reload();
      // });
    }

});
