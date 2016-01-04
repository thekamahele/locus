(function () {
  'use strict';
   angular
    .module( 'locus.auth', [] )
    .controller('AuthCtrl', function ( AuthFactory, $state ) {

        var auth = this;
        auth.username = '';
        auth.password = '';
        auth.login = login;
        auth.logout = logout;
        auth.signup = signup;

        function login ( username, password ) {
            'use strict';

            var user = {
              username : username,
              password : password
            };
            AuthFactory
              .login(user)
              .then(function (res) {
                  console.log('Response is', res);
                  console.log('Token is', res.data.token);
              }, handleError)
              .then(function() {
                $state.go('dashboard');
              });
        }

        function logout () {
            AuthFactory.logout();
        }

        function signup () {
          AuthFactory.signup();
        }

        function handleError (err) {
            console.log('Err is ', err);
        }
    });
})();
