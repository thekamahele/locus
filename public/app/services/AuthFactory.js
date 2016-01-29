(function () {
	'use strict';

	angular
			.module('locus')
			.factory('AuthFactory', AuthFactory);

	AuthFactory.$inject = ['TokenFactory', '$http'];

	function AuthFactory(TokenFactory, $http) {
		var url = 'http://localhost:3000/api';
		var service = {
			login: login,
			logout: logout,
			signup: signup
		};
		return service;

		function login(user) {
			return $http.post(url + '/users/signin', {
				username: user.username,
				password: user.password
			})
				.then(function(response) {
					TokenFactory.setToken(response.data.token);
					console.log('response from login', response)
					return response;
				})
		};

		function logout() {
			TokenFactory.setToken();
		};

		function signup(data) {
			console.log('data in signup', data)
			return $http.post(url + '/users/signup', {
				firstName: data.firstName,
				lastName: data.lastName,
				username: data.username,
				email: data.email,
				password: data.password
			})
				.then(function(result) {
					console.log('Signup success', result)
				})
				.catch(function(err){
					console.error('Error in signing up:', err)
				})
		}
	}

})();

