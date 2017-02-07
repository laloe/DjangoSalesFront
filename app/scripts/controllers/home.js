'use strict';

angular.module('djangoSalesApp')
	.controller('HomeCtrl', function(authFactory, $rootScope, $localStorage) {
		function initData() {
			vm.username = $localStorage.currentUser.userName;
			$rootScope.$on('chanageTitle', function(event, title) {
				vm.title = title;
			});
		}

		function salir() {
			authFactory.LogOut();
		}


		var vm = this;
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		vm.salir = salir;
		vm.title = 'Dashboard';
		initData();

	});
