'use strict';
angular.module('djangoSalesApp')
	.controller('nuevoProductoCtrl', function(productosFactory, $rootScope, ngNotify, $state) {
		function initialData() {
			$rootScope.$emit('chanageTitle', 'Nuevo Producto');
			productosFactory.getProveedores().then(function(data) {
				data.unshift({
					'nombre': '-------------------------',
					'id': 0
				});
				vm.proveedores = data;
				vm.selectedProveedor = vm.proveedores[0];
			});
			productosFactory.getUnidades().then(function(data) {
				data.unshift({
					'nombre': '-------------------------',
					'id': 0
				});
				vm.unidades = data;
				vm.selectedUnidad = vm.unidades[0];
			});
		}

		function checarUpc() {
			productosFactory.checkUpc(vm.upc).then(function(data) {
				if (data.length > 0) {
					vm.showUpc = true;
				} else {
					vm.showUpc = false;
				}
			});
		}

		function guardaProducto() {
			if (vm.showUpc == true) {
				ngNotify.set('Introduce un UPC válido', 'error');
			} else if (vm.selectedProveedor.id == 0) {
				ngNotify.set('Selecciona un Proveedor válido', 'error');
			} else if (vm.selectedUnidad.id == 0) {
				ngNotify.set('Selecciona una Unidad válida', 'error');
			} else {
				var producto = {
					upc: vm.upc,
					nombre: vm.nombre,
					proveedor: vm.selectedProveedor.id,
					unidad: vm.selectedUnidad.id,
					entrada: vm.entrada,
					salida: vm.salida
				};
				productosFactory.nuevoProducto(producto).then(function(data) {
					if (data.producto) {
						$state.go('main.home.productos');
						ngNotify.set(data.producto + ' Agregado Correctamente', 'success');
					} else {
						ngNotify.set('Error al agregar el producto.', 'error')
					}
				});
			}
		}

		var vm = this;
		vm.title = 'Nuevo Producto';
		vm.checarUpc = checarUpc;
		vm.guardaProducto = guardaProducto;
		initialData();
	});
