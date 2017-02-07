angular
	.module('djangoSalesApp')
	.factory('authFactory', function($http, $q, $localStorage, $location) {
		var factory = {};
		var paths = {
			getAutentication: "/api-token-auth/",
		}

		factory.getAuth = function(username, password) {
			var deferred = $q.defer();
			var Parametros = {
				"username": username,
				"password": password
			};
			$http.post('http://localhost:8000' + paths.getAutentication, JSON.stringify(Parametros)).then(function(response) {
				if (response.data.token) {
					$localStorage.currentUser = {
						token: response.data.token
					};
					deferred.resolve(true);
				} else {
					deferred.resolve(false);
				}
			}).catch(function(response) {
				deferred.resolve(false);
			});

			return deferred.promise;
		};

		factory.getUser = function() {
			var deferred = $q.defer();
			$http.get('http://localhost:8000/api/profile/' + $localStorage.currentUser.token + '/', {
				headers: {
					"Authorization": 'Token ' + $localStorage.currentUser.token
				}
			}).then(function(response) {
				$localStorage.currentUser.userName = response.data.user.username;
				$localStorage.currentUser.name = response.data.user.first_name;
				$localStorage.currentUser.lastName = response.data.user.last_name;
				$localStorage.currentUser.tipoUser = response.data.user.tipo;
				deferred.resolve(response.data.user);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.LogOut = function() {
			delete $localStorage.currentUser;
			$location.path('/login');
		};

		return factory;
	});
