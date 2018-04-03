app.controller('itemInfoCtrl', function($routeParams,$http,globalBasket,$location){
    var vm = this;
    vm.item =[];
    vm.load = function(){
        $http.get(`/items/${$routeParams.name}/${$routeParams.id}`).then(
            res=>vm.item = res.data,
            err=>console.log(err)
        );
        globalBasket.getItems().then(
            res=>{
                if (res == undefined) {
                    vm.basket = [];
                }else {
                    vm.basket = res;
                }
            },
            err=>console.log(err)
        )
    }
    vm.load();

    vm.getTotalPrice = function(){
        return globalBasket.getCountAndTotalPrice().price;
    }
    vm.getCount = function(){
        return globalBasket.getCountAndTotalPrice().count;
    }

    vm.closeItem = function(){
        delete vm.selectedItem;
    }
    vm.go_to_basket = function(){
    	delete vm.selectedItem;
    	$location.url('/basket')
    }

    vm.addToBasket = function(item) {
    	vm.selectedItem = item;
        if (auditId(item._id)) {
            $http.post('/basket',item).then(
                vm.addItem,
                vm.errHandler
            );
        }else {
            vm.rr.quantity+=1
            $http.put('/basket',vm.rr).then(
                updateQuantity(item._id),
                vm.errHandler
            );
        }
    }

    function auditId(id){
        vm.rr = {};
        var check = true;
        for (var i = 0; i < vm.basket.length; i++) {
            if (vm.basket[i]._id == id) {
                check = false;
                vm.rr = vm.basket[i];
            }
        }
        return check;
    }
    function updateQuantity(id){
        return function(){
            var index = vm.basket.findIndex(e=>e._id==id);
            vm.basket.splice(index,1,vm.rr);
        }
    }


    vm.addItem = function(res) {
        vm.basket.push(res.data);
    }

    vm.errHandler = function(err){
        console.log(err);
    }
});