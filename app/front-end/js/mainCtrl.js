app.controller('mainCtrl', function(globalBasket,authServices,$http,$location,$scope,$rootScope){
	var vm = this;
    vm.loading = false;
    $rootScope.isAuthenticated = true;
    
	vm.getCount = function(){
        return globalBasket.getCountAndTotalPrice().count;
    }
    vm.isDropdownVisible = false;
    vm.triggerMenu = function(){
        vm.isDropdownVisible =! vm.isDropdownVisible;
    }

    // $scope.$watch($rootScope.check, function(value) {
    //   // vm.btn_popup = value;
    //   $rootScope.check = value;
    // });

    vm.email = '';
    vm.login = '';
    vm.phone = '';
    vm.password = '';
    var errorsObj = {};
    vm.clearEmailMass = function(){
        vm.email = '';
    }
    vm.clearLoginMass = function(){
        vm.login = '';
    }
    vm.clearPhoneMass = function(){
        vm.phone = '';
    }
    vm.clearPassMass = function(){
        vm.password = '';
    }


    vm.sendRegistration = function(request){
        $http.post('/registration', request).then(
            res=>{
                var popup = document.querySelector('.popup');
                var overlay = document.querySelector('#overlay');
                popup.style.display = 'none';
                overlay.parentNode.removeChild(overlay);
                vm.requestRegistr = {};
            },
            errorsMessage
        );
    }
    function errorsMessage(err){
        errorsObj = {};
        for (field in err.data.errors) {
            var key = err.data.errors[field].path;
            errorsObj[key] = err.data.errors[field].message;
        }
        writeMessage(errorsObj)
    }

    function writeMessage(err){
        if (err.login) {
            vm.login = err.login;
        }
        if (err.email) {
            vm.email = err.email;
        }
        if (err.phone) {
            vm.phone = err.phone;
        }
        if (err.password) {
            vm.password = err.password;
        }
    }

    vm.sendAuth = function(request){
        vm.loading = true;
        $http.post('/login', request).then(
            ()=>$http.post('/current/user').then(
                function(res){
                    $rootScope.photo = res.data.images;
                    vm.loading = false;
                    var popup = document.querySelector('.popup');
                    var overlay = document.querySelector('#overlay');
                    popup.style.display = 'none';
                    overlay.parentNode.removeChild(overlay);
                    globalBasket.getItems();
                    vm.request = {};
                   $location.url('/profile');
                }
            ),
            (err)=>{
                console.log(err)
                vm.loading = false;
            }
        );
    }

    vm.deleteSession = function(){
        $http.post('/current/user/destroy').then(
            res=>{
                $rootScope.isAuthenticated = false;
                globalBasket.getItems();
                $location.url('/');
            },
            err=>console.log(err)
        )
    }

    
});
