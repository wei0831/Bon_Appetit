var app = angular.module('app', ['ui.router', 'mgcrea.ngStrap', 'ngAnimate', 'satellizer', 'angular-jwt', 'angularFileUpload']);

app.config(function($stateProvider, $urlRouterProvider, $authProvider){
  $stateProvider
  .state('home',{
    url: '/',
    views: {
        "nav_top": { templateUrl: "partials/nav_default.html" },
        "main": { templateUrl: "partials/about.html" }
    }
  })
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
  .state('menu', {
    url: '/menu',
    views: {
        "nav_top": { templateUrl: "partials/nav_default.html" },
        "main": { templateUrl: "partials/menu.html"}
    }
  })
  .state('meal', {
    url: '/meal',
    views: {
        "nav_top": { templateUrl: "partials/nav_default.html" },
        "main": { templateUrl: "partials/meal.html"}
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
    redirectTo: 'ingredients.view',
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
  .state('dashboard', {
    url:'/dashboard',
    views: {
        "nav_top": { templateUrl: "partials/nav_default.html" },
        "main": { templateUrl: "partials/dashboard.html"}
    }
  })
  .state('logout', {
    url: '/logout',
    template: null,
    controller: 'logoutCtrl'
  });

  $urlRouterProvider.otherwise('/');

});
