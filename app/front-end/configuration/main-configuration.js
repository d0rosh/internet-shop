app.config(function($routeProvider, $locationProvider){
    $routeProvider.when('/', {
        templateUrl: '/page/home/home.html',
        controller: 'homeCtrl',
        controllerAs: 'ctrl'
    });
    $routeProvider.when('/add', {
        templateUrl: '/add.html',
        controller: 'addCtrl',
        controllerAs: 'ctrl'
    });
    $routeProvider.when('/categories_men', {
        templateUrl: '/page/category-men/categoryMen.html',
        controller: 'categoryMenCtrl',
        controllerAs: 'ctrl'
    });
    $routeProvider.when('/categories_woman', {
        templateUrl: '/page/category-woman/categoryWoman.html',
        controller: 'categoryWomanCtrl',
        controllerAs: 'ctrl'
    });
    $routeProvider.when('/categories_men/:name', {
        templateUrl: '/page/item-in-category/itemInCategory.html',
        controller: 'itemInCategoryCtrl',
        controllerAs: 'ctrl'
    });
    $routeProvider.when('/categories_men/:name/:id', {
        templateUrl: '/page/item-info/itemInfo.html',
        controller: 'itemInfoCtrl',
        controllerAs: 'ctrl'
    });
    $routeProvider.when('/categories_woman/:name', {
        templateUrl: '/page/item-in-category/itemInCategory.html',
        controller: 'itemInCategoryCtrl',
        controllerAs: 'ctrl'
    });
    $routeProvider.when('/categories_woman/:name/:id', {
        templateUrl: '/page/item-info/itemInfo.html',
        controller: 'itemInfoCtrl',
        controllerAs: 'ctrl'
    });
    $routeProvider.when('/registration', {
        templateUrl: '/registration.html',
        controller: 'registrationCtrl',
        controllerAs: 'ctrl'
    });
    $routeProvider.when('/login', {
        templateUrl: '/page/login/login.html',
        controller: 'loginCtrl',
        controllerAs: 'ctrl'
    });
    $routeProvider.when('/basket', {
        templateUrl: '/page/basket/basket.html',
        controller: 'basketCtrl',
        controllerAs: 'ctrl'
    });
    $routeProvider.when('/profile', {
        templateUrl: '/page/profile/profile.html',
        controller: 'profileCtrl',
        controllerAs: 'ctrl',
        // resolve: {
        //     user: function(authServices,$location) {
        //         return authServices.getAuth().then(
        //             function(res){
        //                 $location.path($location.$$url);
        //                 return res;
        //             },
        //             err=>{
        //                 $location.path('/login');

        //             }
        //         )
        //         // if (authServices.getUser == false) {

        //         // }
        //     }
        // }
        data: {
           private: true
        }
    });

    $routeProvider.otherwise({
		templateUrl: '/page/error/error.html'
	});
});
app.run(function($rootScope, authServices,$route,$location) { $rootScope.$on('$routeChangeStart',
    function(evt, next, current) {
        authServices.getAuth().then(
            res=>{
                $rootScope.isAuthenticated = true;
                $rootScope.photo = res.data.images;
                if (next.originalPath == '/login') {
                    $location.path('/');
                }else {
                    $location.path($location.$$url);
                }
            },
            err=>{
                $rootScope.isAuthenticated = false;
                if (next.data) {
                    $location.path('/login');
                }else {
                    $location.path($location.$$url);
                }
            } 
        )
    });
});


