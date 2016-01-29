(function () {
	'use strict';

	angular
		.module('locus')
		.factory('AuthInterceptor', AuthInterceptor);

	AuthInterceptor.$inject = ['TokenFactory'];

	function AuthInterceptor(TokenFactory) {
		var service = {
			request: addToken
		};
		return service;

		////////////////

		function addToken(config) {
			var token = TokenFactory.getToken();

			if ( token ) {
				config.headers = config.headers || {};
				config.headers.Authorization = 'Bearer ' + token;
			}

			return config;
		}
	}

})();
