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

locus.factory('AuthFactory', function ( $http ) {
    var url = 'http://localhost:3000/'
    var verifyUser = function (userObj) {
        console.log('sending')
        return $http({
            method : 'POST',
            url    : url + 'api/signin',
            data   : userObj
        });
    };

    return {
        verifyUser : verifyUser
    }
});

