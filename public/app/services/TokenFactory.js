(function () {
	'use strict';

	angular
		.module('locus')
		.factory('TokenFactory', TokenFactory);

	TokenFactory.$inject = ['$window'];

	/* @ngInject */
	function TokenFactory($window) {
		var store = $window.localStorage;
		var key = 'auth-token';

		var service = {
			setToken: setToken,
			getToken: getToken
		};
		return service;

		////////////////

		function setToken(token) {
			token ? store.setItem(key, token) : store.removeItem(key);
		}

		function getToken() {
			return store.getItem(key)
		}
	}

})();

