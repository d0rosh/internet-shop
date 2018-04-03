app.controller('basketCtrl', function($http,globalBasket,$rootScope){
    var vm = this;
    vm.basket = [];
    globalBasket.getItems().then(
        res=>{
            if (res == undefined) {
                vm.basket = ''
            }else {
                vm.basket = res;
            }
        },
        err=>console.log(err)
    );

    vm.getTotalQuantity = function(item,number){
    	item.quantity += number;
        globalBasket.setCheckQuantity(item);
    }
    
    vm.getChangeTotalQuantity = function(item,number){
        if (number==0) {
            number=1;
        }
        var num = Number(number);
        item.quantity = num;
        globalBasket.setCheckQuantity(item);
    }
    
    vm.getTotalPrice = function(){
        return globalBasket.getCountAndTotalPrice().price;
    }

    vm.clearBasket = function(){
        globalBasket.clearBasket();
    }

    vm.deleteItem = function(id){
        globalBasket.deleteItem(id);
    }

    vm.errHandler = function(err){
        console.log(err);
    }

    // vm.sendMail = function(){
    // 	$http.get('/render-mail').then(
    // 		function(res){
    //            $http.put('/items',vm.basket).then(
    //                 res=>globalBasket.clearBasket(),
    //                 err=>console.log(err)
    //            );
    //         },
    // 		err=>console.log(err)
    // 	);
    // }

    vm.sendMail = function(){
        $http.get('/render-mail').then(
            res=>console.log(res),
            err=>console.log(err)
        );
    }

});