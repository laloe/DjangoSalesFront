angular
	.module('djangoSalesApp')
	.controller('DeleteProductCtrl', function($rootScope, $uibModalInstance, productosFactory, item, $state, ngNotify) {
		function initialData() {
			vm.item = item;
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function eliminarProducto() {
			productosFactory.deleteProduct(item.id).then(function(data) {
				cancel();
				$rootScope.$emit('reloadProducts', {});
				ngNotify.set('Producto eliminado correctamente', 'success');
			});
		}

		var vm = this;
		initialData();
		vm.cancel = cancel;
		vm.eliminarProducto = eliminarProducto;
	});
