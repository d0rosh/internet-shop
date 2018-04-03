app.controller('categoryWomanCtrl', function($http, $location, $scope){
    var vm = this;
    vm.categories= [];
    vm.sex = "Woman";
    vm.size = 8;
    vm.page = 1;
    vm.pageCount = Math.ceil(vm.categories.length/vm.size);
    
    // $scope.$watch('pageCount', function(value){
    //     console.log(value)
    // })

    $scope.$watch('ctrl.size', function(newValue, oldValue){
        if(newValue!==oldValue){
            vm.size = newValue;
            vm.page = 1;
            vm.pageCount = Math.ceil(vm.categories.length/vm.size);
        }
    });

    $http.get('/categories')
        .then(function(res,err){
        	sexFilter(res.data),
            errHandler
        }
    );

    vm.show = function(category){
        $location.url(`/categories_woman/${category.name}`);
    }

    function sexFilter(res){
        for(var i = 0; i < res.length; i++){
            if(res[i].sex.indexOf(vm.sex)>-1){
                vm.categories.push(res[i]);
            }
        }
        vm.pageCount = Math.ceil(vm.categories.length/vm.size);
    }
    function errHandler(){
        console.log(err);
    }

});
