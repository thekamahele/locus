(function () {
	'use strict';

	angular
		.module('locus.dashboard', [])
		.controller('DashboardCtrl', DashboardCtrl);

	DashboardCtrl.$inject = ['AuthFactory', '$state'];

	function DashboardCtrl(AuthFactory, $state) {
		var vm = this;
		vm.title = 'DashboardCtrl';
		vm.logout = logout;

		function logout() {
			AuthFactory.logout();
			$state.go('login');
		};

	}

})();

