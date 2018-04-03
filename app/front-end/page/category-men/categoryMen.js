app.controller('categoryMenCtrl', function($http, $location){
    var vm = this;
    vm.categories = [];
    vm.sex = "Men";
    

    $http.get('/categories')
        .then(
            function(res){
        	   sexFilter(res.data)
            },
            errHandler
        );

    vm.show = function(category){
        $location.url(`/categories_men/${category.name}`);
    }

    function sexFilter(res){
        for(var i = 0; i < res.length; i++){
            if(res[i].sex.indexOf(vm.sex)>-1){
                vm.categories.push(res[i]);
            }
        }
    }
    function errHandler(err){
        console.log(err);
    }

});