(function () {
  'use strict';
   angular
    .module( 'locus.auth', [] )
    .controller('AuthCtrl', function ( AuthFactory ) {
        'use strict';
        var auth = this;
        auth.username = '';
        auth.password = '';

        auth.login = function ( username, password ) {
            'use strict';

            var user = {
                username : username,
                password : password
            };
            AuthFactory
                .verifyUser(user)
                .then(function (response) {
                    console.log('Response is', response);
                }, handleError);
        };

        function handleError (err) {
            console.log('Err is ', err);
        }
    });
})();
