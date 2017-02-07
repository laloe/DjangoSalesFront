'use strict';
angular
	.module('djangoSalesApp')
	.factory('productosFactory', function($http, $q, $localStorage) {
		var factory = {};
		var paths = {
			getProducts: '/api/productos/?is_active=true',
			getProveedores: '/api/proveedores/',
			getUnidades: '/api/unidades/',
			checkUpc: '/api/productos/?upc=',
			products: '/api/productos/',
		};

		factory.getProducts = function() {
			var deferred = $q.defer();
			$http.get('http://localhost:8000' + paths.getProducts, {
				headers: {
					'Authorization': 'Token ' + $localStorage.currentUser.token
				}
			}).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.resolve(response);
			});

			return deferred.promise;
		};

		factory.getProveedores = function() {
			var deferred = $q.defer();
			$http.get('http://localhost:8000' + paths.getProveedores, {
				headers: {
					'Authorization': 'Token ' + $localStorage.currentUser.token
				}
			}).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.resolve(response);
			});

			return deferred.promise;
		};

		factory.getUnidades = function() {
			var deferred = $q.defer();
			$http.get('http://localhost:8000' + paths.getUnidades, {
				headers: {
					'Authorization': 'Token ' + $localStorage.currentUser.token
				}
			}).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.resolve(response);
			});

			return deferred.promise;
		};

		factory.checkUpc = function(id) {
			var deferred = $q.defer();
			$http.get('http://localhost:8000' + paths.checkUpc + id, {
				headers: {
					'Authorization': 'Token ' + $localStorage.currentUser.token
				}
			}).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.resolve(response);
			});

			return deferred.promise;
		};

		factory.nuevoProducto = function(producto) {
			var deferred = $q.defer();
			var Parameters = {
				'upc': producto.upc,
				'nombre': producto.nombre,
				'proveedor': producto.proveedor,
				'unidad': producto.unidad,
				'precio_entrada': producto.entrada,
				'precio_salida': producto.salida
			};
			$http.post('http://localhost:8000' + paths.products, JSON.stringify(Parameters), {
				headers: {
					'Authorization': 'Token ' + $localStorage.currentUser.token
				}
			}).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.resolve(response);
			});

			return deferred.promise;
		};

		factory.singleProduct = function(id) {
			var deferred = $q.defer();
			$http.get('http://localhost:8000' + paths.products + id + '/', {
				headers: {
					'Authorization': 'Token ' + $localStorage.currentUser.token
				}
			}).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.resolve(response);
			});

			return deferred.promise;
		};

		factory.updateProduct = function(producto, id) {
			var deferred = $q.defer();
			var Parameters = {
				'id': id,
				'upc': producto.upc,
				'nombre': producto.nombre,
				'proveedor': producto.proveedor,
				'unidad': producto.unidad,
				'precio_entrada': producto.entrada,
				'precio_salida': producto.salida
			};
			$http.put('http://localhost:8000' + paths.products + id + '/', JSON.stringify(Parameters), {
				headers: {
					'Authorization': 'Token ' + $localStorage.currentUser.token
				}
			}).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.resolve(response);
			});

			return deferred.promise;
		};


		factory.deleteProduct = function(id) {
			var deferred = $q.defer();
			$http.delete('http://localhost:8000' + paths.products + id + '/', {
				headers: {
					'Authorization': 'Token ' + $localStorage.currentUser.token
				}
			}).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.resolve(response);
			});

			return deferred.promise;
		};


		return factory;

	});
