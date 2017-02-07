'use strict';
angular
	.module('djangoSalesApp')
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/login');
		var states = [{
				name: 'main',
				data: {
					pageTitle: 'DjangoSales'
				},
				abstract: true,
				template: '<div ui-view></div>'
			},
			{
				name: 'main.home',
				data: {
					pageTitle: 'BIENVENIDO | DJANGOSALES',
					permissions: {
						only: ['Administrador'],
						redirectTo: 'main.ventas'
					}
				},
				url: '/home',
				templateUrl: 'views/home/home.html',
				controller: 'HomeCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'main.login',
				data: {
					pageTitle: 'BIENVENIDO | LOGIN'
				},
				url: '/login',
				templateUrl: 'views/login/login.html',
				controller: 'LoginCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'main.ventas',
				data: {
					pageTitle: 'BIENVENIDO | DJANGOSALES',
					permissions: {
						only: ['Administrador', 'Empleado'],
					}
				},
				url: '/ventas',
				templateUrl: 'views/ventas/ventas.html',
				controller: 'VentasCtrl',
				controllerAs: '$ctrl'
			}
		];


		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
