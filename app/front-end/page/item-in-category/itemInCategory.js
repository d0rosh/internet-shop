app.controller('itemInCategoryCtrl', function($routeParams, $http, $location,globalBasket,$localStorage){
    var vm = this;
    vm.itemsCategory =[];
    vm.view = window.localStorage.getItem('check') || 'table';
    vm.load = function(){
        $http.get(`/items/${$routeParams.name}`).then(
            function(res){
                vm.itemsCategory=res.data;
            },
            err=>console.log(err)
        );
    }
    vm.load();

    vm.seeItem = function(item){
        $location.url($location.$$url + `/${item._id}`);
    }


    vm.replaceView = function(list) {
        window.localStorage.setItem('check', list);
        vm.view = window.localStorage.getItem('check');
        if (vm.view == "list") {
            document.querySelector('.list_btn').classList.add("active_view");
            document.querySelector('.grid_btn').classList.remove("active_view");
        }else if(vm.view == "table"){
            document.querySelector('.list_btn').classList.remove("active_view");
            document.querySelector('.grid_btn').classList.add("active_view");
        }
    }
    vm.replaceView(vm.view);

});