'use strict';
angular
	.module('djangoSalesApp', [
		'ngAnimate',
		'ui.router',
		'ngStorage',
		'ngNotify',
		'angularUtils.directives.dirPagination',
		'permission', 'permission.ui',
		'ui.bootstrap'
	])
	.config(function($provide, $httpProvider) {
		$provide.factory('ErrorHttpInterceptor', function($q, $injector) {
			function notifyError(rejection) {
				var mensaje = rejection.statusText;
				var notify = $injector.get('ngNotify');
				var content = '¡Se ha generado un error! \n' + mensaje;
				notify.set(content, {
					type: 'error',
					sticky: true
				});
			}
			return {
				requestError: function(rejection) {
					notifyError(rejection);
					return $q.reject(rejection);
				},
				responseError: function(rejection) {
					notifyError(rejection);
					sessionStorage.clear();
					return $q.reject(rejection);
				}
			};
		});
		$httpProvider.interceptors.push('ErrorHttpInterceptor');
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	})
	.constant('APP_CONFIG', window.appConfig)
	.run(['$rootScope', '$state', '$stateParams', '$localStorage', '$location', 'PermPermissionStore', function($rootScope, $state, $stateParams, $localStorage, $location, PermPermissionStore) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		if ($localStorage.currentUser) {
			$location.path('/home');
			var permissions = $localStorage.currentUser.tipoUser;
			PermPermissionStore.definePermission(permissions, function() {
				return true;
			});
		} else {
			$location.path('/login/');
		}
	}]);
