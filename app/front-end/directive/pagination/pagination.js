app.directive('myPagination', function(){
	return {
		scope:{
			ngModel:'=',
      size:'=?',
      totalPages:'='	
		},
		restrict: 'EA',
		transclude: false,
        replace:false,
        templateUrl:'/directive/pagination/pagination.html',
        link: function(scope, element, attrs){
   			scope.page = scope.ngModel;
   			scope.pages = buildsPages(scope.totalPages);
        
   			scope.$watch('totalPages',function(newValue, oldValue){
   				if(newValue!==oldValue){
		            scope.totalPages = newValue;
		            scope.pages = buildsPages(scope.totalPages)
		        }
   			});
        scope.$watch('ngModel',function(newValue, oldValue){
            if(newValue!==oldValue){
                scope.changePage(newValue)
            }
        });

   			scope.changePage = function(page,ev){
   				if (arguments.length == 1) {
            if (page>0 && page <= scope.totalPages) {
              scope.ngModel = page;
              scope.page = page;
            }
          }else {
            ev.preventDefault();
            if (page>0 && page <= scope.totalPages) {
              scope.ngModel = page;
              scope.page = page;
            }
          }
   			}

   			function buildsPages(totalPages){
   				scope.pages = [];
   				for (var i = 1; i <= totalPages; i++) {
   					scope.pages.push(i)
   				}
   				return scope.pages;
   			}
        }
	}
});