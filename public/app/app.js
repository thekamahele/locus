var locus = angular.module('locus', [
              'locus.auth',
              'locus.dashboard',
              'ngAnimate',
              'ngRoute']);

/////////////// Routes /////////////////
locus.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'app/templates/login.html',
        controller: 'AuthCtrl'
    })
    .when('/dashboard', {
      templateUrl: 'app/templates/dashboard.html',
      controller: 'DashboardCtrl'
    })
    .when('/signup', {
      templateUrl: 'app/templates/signup.html',
      controller: 'AuthCtrl'
    })
    .otherwise({
        redirectTo : '/'
    })
});

