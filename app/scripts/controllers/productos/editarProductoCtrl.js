'use strict';
angular.module('djangoSalesApp')
	.controller('editarProductoCtrl', function(productosFactory, $rootScope, ngNotify, $state, $stateParams) {
		function initialData() {
			$rootScope.$emit('chanageTitle', 'Editar Producto');
			productosFactory.singleProduct($stateParams.id).then(function(data) {
				vm.upc = data.upc;
				vm.nombre = data.nombre;
				vm.entrada = data.precio_entrada;
				vm.salida = data.precio_salida;
				productosFactory.getProveedores().then(function(proveeedores) {
					vm.proveedores = proveeedores;
					vm.proveedores.forEach(function(entry, index) {
						if (entry.id == data.proveedor.id) {
							vm.selectedProveedor = vm.proveedores[index];
						}
					});
				});
				productosFactory.getUnidades().then(function(unidades) {
					vm.unidades = unidades;
					vm.unidades.forEach(function(entry, index) {
						if (entry.id == data.unidad.id) {
							vm.selectedUnidad = vm.unidades[index];
						}
					});
				});
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
				productosFactory.updateProduct(producto, $stateParams.id).then(function(data) {
					if (data.producto) {
						$state.go('main.home.productos');
						ngNotify.set(data.producto + ' Editado Correctamente', 'success');
					} else {
						ngNotify.set('Error al editar el producto.', 'error')
					}
				});
			}
		}

		var vm = this;
		vm.guardaProducto = guardaProducto;
		initialData();
	});
