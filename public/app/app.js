(function () {
    'use strict';

    var locus = angular.module('locus', [
        'locus.auth',
        'locus.dashboard',
        'ngAnimate',
        'ui.router'], function config( $httpProvider ) {
            $httpProvider.interceptors.push('AuthInterceptor');
        });

/////////////// Routes /////////////////
    locus.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        'use strict';

        $urlRouterProvider.otherwise('dashboard');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/templates/login.html',
                controller: 'AuthCtrl as auth'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/templates/signup.html',
                controller: 'AuthCtrl as auth'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/templates/dashboard.html',
                controller: 'DashboardCtrl as dash'
            });

    });

})();