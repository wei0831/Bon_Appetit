var app = angular.module('app',
['ui.router', 'ngSanitize','mgcrea.ngStrap', 'ngAnimate', 'satellizer', 'angular-jwt', 'ui.slider', 'restangular', 'angularFileUpload', 'dndLists', 'ui.bootstrap']);

app.config(function($stateProvider, $urlRouterProvider, $authProvider, RestangularProvider){

  $stateProvider
  .state('user', {
    url: '/user',
    views: {
        "nav_top": { templateUrl: "partials/nav_default.html" },
        "main": { templateUrl: "partials/profile.html", controller: 'userCtrl' }
    },
    resolve: {
     authenticated : function($q, $location, $auth) {
       var deferred = $q.defer();
       if (!$auth.isAuthenticated()) {
         $location.path('/login');
       } else {
         deferred.resolve();
       }
       return deferred.promise;
     }
    }
  })
  .state('about', {
    url: '/about',
    views: {
        "nav_top": { templateUrl: "partials/nav_default.html" },
        "main": { templateUrl: "partials/about.html"}
    }
  })
  .state('ingredients', {
    url: '/ingredients',
    views: {
        "nav_top": { templateUrl: "partials/nav_default.html" },
        "main": { templateUrl: "partials/ingredients/index.html", controller: 'ingredientsCtrl'}
    }
  })
  .state('ingredients.view', {
    views: {
        "nav_side": { templateUrl: "partials/ingredients/index.nav_leftside.html"},
        "content": { templateUrl: "partials/ingredients/index.view.html"}
    }
  })
  .state('ingredients.add', {
    views: {
      "nav_side": { templateUrl: "partials/ingredients/index.nav_leftside.html"},
      "content": { templateUrl: "partials/ingredients/index.add.html"}
    }
  })
  .state('ingredients.edit', {
    views: {
      "nav_side": { templateUrl: "partials/ingredients/index.nav_leftside.html"},
      "content": { templateUrl: "partials/ingredients/index.edit.html"}
    }
  })
  .state('ingredients.remove', {
    views: {
      "nav_side": { templateUrl: "partials/ingredients/index.nav_leftside.html"},
      "content": { templateUrl: "partials/ingredients/index.remove.html"}
    }
  })
  .state('recipes', {
    url: '/recipes',
    redirectTo: 'recipes.view',
    views: {
        "nav_top": { templateUrl: "partials/nav_default.html" },
        "main": { templateUrl: "partials/recipes/index.html", controller: 'recipesCtrl'}
    }
  })
  .state('recipes.view', {
    views: {
        "nav_side": { templateUrl: "partials/recipes/index.nav_leftside.html"},
        "content": { templateUrl: "partials/recipes/index.view.html"}
    }
  })
  .state('recipes.add', {
    views: {
      "nav_side": { templateUrl: "partials/recipes/index.nav_leftside.html"},
      "content": { templateUrl: "partials/recipes/index.add.html"}
    }
  })
  .state('recipes.edit', {
    views: {
      "nav_side": { templateUrl: "partials/recipes/index.nav_leftside.html"},
      "content": { templateUrl: "partials/recipes/index.edit.html"}
    }
  })
  .state('recipes.remove', {
    views: {
      "nav_side": { templateUrl: "partials/recipes/index.nav_leftside.html"},
      "content": { templateUrl: "partials/recipes/index.remove.html"}
    }
  })
  .state('meals', {
    url: '/meals',
    redirectTo: 'meals.view',
    views: {
        "nav_top": { templateUrl: "partials/nav_default.html" },
        "main": { templateUrl: "partials/meals/index.html", controller: 'mealsCtrl'}
    }
  })
  .state('meals.view', {
    views: {
        "nav_side": { templateUrl: "partials/meals/index.nav_leftside.html"},
        "content": { templateUrl: "partials/meals/index.view.html"}
    }
  })
  .state('meals.add', {
    views: {
      "nav_side": { templateUrl: "partials/meals/index.nav_leftside.html"},
      "content": { templateUrl: "partials/meals/index.add.html"}
    }
  })
  .state('meals.edit', {
    views: {
      "nav_side": { templateUrl: "partials/meals/index.nav_leftside.html"},
      "content": { templateUrl: "partials/meals/index.edit.html"}
    }
  })
  .state('meals.remove', {
    views: {
      "nav_side": { templateUrl: "partials/meals/index.nav_leftside.html"},
      "content": { templateUrl: "partials/meals/index.remove.html"}
    }
  })
  .state('menus', {
    url: '/menus',
    redirectTo: 'menus.view',
    views: {
        "nav_top": { templateUrl: "partials/nav_default.html" },
        "main": { templateUrl: "partials/menus/index.html", controller: 'menusCtrl'}
    }
  })
  .state('menus.view', {
    views: {
        "nav_side": { templateUrl: "partials/menus/index.nav_leftside.html"},
        "content": { templateUrl: "partials/menus/index.view.html"}
    }
  })
  .state('menus.add', {
    views: {
      "nav_side": { templateUrl: "partials/menus/index.nav_leftside.html"},
      "content": { templateUrl: "partials/menus/index.add.html"}
    }
  })
  .state('menus.edit', {
    views: {
      "nav_side": { templateUrl: "partials/menus/index.nav_leftside.html"},
      "content": { templateUrl: "partials/menus/index.edit.html"}
    }
  })
  .state('menus.remove', {
    views: {
      "nav_side": { templateUrl: "partials/menus/index.nav_leftside.html"},
      "content": { templateUrl: "partials/menus/index.remove.html"}
    }
  })
  .state('dashboard', {
    url: '/',
    redirectTo: 'dashboard.menu',
    views: {
        "nav_top": { templateUrl: "partials/nav_default.html" },
        "main": { templateUrl: "partials/dashboard/index.html", controller: 'dashboardCtrl'}
    }
  })
  .state('dashboard.menu', {
    views: {
        "nav_side": { templateUrl: "partials/dashboard/index.nav_leftside.html"},
        "content": { templateUrl: "partials/dashboard/index.menu.html"}
    }
  })
  .state('dashboard.meal', {
    views: {
      "nav_side": { templateUrl: "partials/dashboard/index.nav_leftside.html"},
      "content": { templateUrl: "partials/dashboard/index.meal.html"}
    }
  })
  .state('dashboard.recipe', {
    views: {
      "nav_side": { templateUrl: "partials/dashboard/index.nav_leftside.html"},
      "content": { templateUrl: "partials/dashboard/index.recipe.html"}
    }
  })
  .state('dashboard.ingredient', {
    views: {
      "nav_side": { templateUrl: "partials/dashboard/index.nav_leftside.html"},
      "content": { templateUrl: "partials/dashboard/index.ingredient.html"}
    }
  })
  .state('signup', {
    url: '/signup',
    views: {
        "nav_top": { templateUrl: "partials/nav_default.html" },
        "main": { templateUrl: "partials/signup.html", controller: 'signupCtrl'}
    }
  })
  .state('login', {
    url: '/login',
    views: {
        "nav_top": { templateUrl: "partials/nav_default.html" },
        "main": { templateUrl: "partials/login.html", controller: 'loginCtrl' }
    }
  })
  .state('logout', {
    url: '/logout',
    template: null,
    controller: 'logoutCtrl'
  });

  $urlRouterProvider.otherwise('/');

});
