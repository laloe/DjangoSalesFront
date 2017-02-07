angular
	.module('djangoSalesApp')
	.controller('LoginCtrl', function($state, authFactory, $location, ngNotify, $localStorage, $window) {
		var vm = this;
		vm.login = login;
		initialData();

		function initialData() {
			if ($localStorage.currentUser) {
				$state.go('main.home');
			}
		}

		function login() {
			authFactory.getAuth(vm.user, vm.password).then(function(data) {
				if (data === true) {
					authFactory.getUser().then(function(data) {
						$window.location.reload();
					});
				} else {
					ngNotify.set('¡Usuario y/o contraseña incorrecta!', 'error');
				}
			});
		}
	});
