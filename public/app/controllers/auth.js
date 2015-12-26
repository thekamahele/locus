(function () {
  angular
    .module('locus.auth', [])
    .controller('AuthCtrl', function ( $scope, Auth ) {
        $scope.username = '';
        $scope.password = '';

        $scope.login = function () {
            var user = {
                username : $scope.username,
                password : $scope.password
            };
            Auth.verifyUser(user)
                .then(function (response) {
                    console.log('Response is', response);
                })
        }
    });
})();
