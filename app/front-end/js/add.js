app.controller('addCtrl', function($http){
    var vm = this;
    vm.categories= [];
    vm.items = [];
    vm.currentItem = {};
    vm.currentCategory = {};
    vm.sex = [
        {name:'Men',id:1},
        {name:'Woman',id:2}
    ];
    

    vm.refresh = function(){
        $http.get('/categories').then(function(res){
            vm.categories = res.data;
        }, function(err){
            console.log(err);
        });
    }
    vm.refresh();

    vm.saveCategory = function() {
    	$http.post("/categories",vm.currentCategory)
    		.then(
                vm.addCategory,
                vm.errHandler
            );
        vm.currentCategory = {};
        vm.refresh();
    }

    vm.saveItem = function() {
        $http.post("/items",vm.currentItem)
            .then(
                vm.addItem,
                vm.errHandler
            );
        vm.currentItem = {};
    }

    vm.addCategory = function(res) {
        vm.categories.push(res.data);
    }
    vm.addItem = function(res) {
        vm.items.push(res.data);

    }
    vm.errHandler = function(err){
        console.log(err);
    }


});