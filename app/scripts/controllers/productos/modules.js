'use strict';
angular
	.module('djangoSalesApp')
	.config(function($stateProvider, $urlRouterProvider) {
		var states = [{
				name: 'main.home.productos',
				data: {
					pageTitle: 'DJANGOSALES | PRODUCTOS'
				},
				url: '/productos',
				templateUrl: 'views/productos/productos.html',
				controller: 'ProductosCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'main.home.productoNuevo',
				data: {
					pageTitle: 'DJANGOSALES | NUEVO PRODUCTO'
				},
				url: '/producto/nuevo',
				templateUrl: 'views/productos/nuevoProducto.html',
				controller: 'nuevoProductoCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'main.home.productoEditar',
				data: {
					pageTitle: 'DJANGOSALES | EDITAR PRODUCTO'
				},
				url: '/producto/editar/:id',
				templateUrl: 'views/productos/editarProducto.html',
				controller: 'editarProductoCtrl',
				controllerAs: '$ctrl'
			}
		];


		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
