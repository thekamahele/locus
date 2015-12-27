(function () {
  'use strict';
   angular
    .module( 'locus.auth', [] )
    .controller('AuthCtrl', function ( AuthFactory ) {
        'use strict';

        var auth = this;
        auth.username = '';
        auth.password = '';
        auth.login = login;
        auth.logout = logout;

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
                }, handleError);
        }

        function logout () {
            AuthFactory.logout();
        }

        function handleError (err) {
            console.log('Err is ', err);
        }
    });
})();
