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
                controller: 'AuthCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/templates/signup.html',
                controller: 'AuthCtrl'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/templates/dashboard.html',
                controller: 'DashboardCtrl'
            });

    });

    locus.factory('AuthFactory',['TokenFactory', '$http', function (TokenFactory, $http) {
        'use strict';

        var url = 'http://localhost:3000/';
        var login = function (userObj) {
            return $http({
                method: 'POST',
                url: url + 'api/signin',
                data: userObj
            })
            .then(function (response) {
                TokenFactory.setToken(response.data.token);
                return response;
            });
        };

        var logout = function () {
            TokenFactory.setToken();
        };

        return {
            login  : login,
            logout : logout
        };
    }]);

    locus.factory('TokenFactory', ['$window', function ($window) {
        'use strict';

        var store = $window.localStorage;
        var key = 'auth-token';

        var getToken = function () {
            return store.getItem(key);
        };

        var setToken = function (token) {
            if ( token ) {
                store.setItem(key, token);
            } else {
                store.removeItem(key);
            }
        };

        return {
            getToken : getToken,
            setToken : setToken
        };
    }]);

    locus.factory('AuthInterceptor', ['TokenFactory', function (TokenFactory) {
        'use strict';
        var addToken = function(config) {
            var token = TokenFactory.getToken();

            if ( token ) {
                 config.headers = config.headers || {};
                 config.headers.Authorization = 'Bearer' + token;
            }

            return config;
        };
         return {
            request : addToken
         };
    }])

})();