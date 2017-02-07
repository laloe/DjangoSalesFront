angular
	.module('djangoSalesApp')
	.controller('ProductosCtrl', function($rootScope, productosFactory, $uibModal) {
		function initData() {
			$rootScope.$emit('chanageTitle', 'Productos');
			productosFactory.getProducts().then(function(data) {
				vm.productos = data;
			});
		}

		function sort(keyname) {
			vm.sortKey = keyname; //set the sortKey to the param passed
			vm.reverse = !vm.reverse; //if true make it false and vice versa
		}

		$rootScope.$on('reloadProducts', function() {
			initData();
		});

		function deleteProduct(item) {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/productos/modalDeleteProduct.html',
				controller: 'DeleteProductCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'md',
				resolve: {
					item: function() {
						return item;
					}
				}
			});
		}

		var vm = this;
		vm.sort = sort;
		vm.deleteProduct = deleteProduct;
		initData();
	});
