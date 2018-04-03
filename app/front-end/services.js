app.factory('globalBasket',function($http){
	var count = 0;
	var basket = [];
	var price = 0;

	var getItems = function(){
		return $http.post('/current/user').then(
			res=>{
				// if (res.data.status == 401) {
				// 	return console.log('401')
				// }else {
					return $http.get('/basket').then(
						res=>{
							basket = res.data.basket;
							return res.data.basket;
						}
					);
				// }
			},
			err=>{
				console.log(err);
				basket = [];
			}
		)
	}
	getItems();

	var load = function(){
		count = 0;
		price = 0;
		for(var i = 0; i < basket.length; i++) {
			count += basket[i].quantity;
			price += basket[i].price * basket[i].quantity;
		}
		return {
			count:count,
			price:price
		};
	}

	function deleteItem(id){
        return function(){
            var index = findItemIndex(id);
            basket.splice(index,1);
        }
    }

    function findItemIndex(id){
        return basket.findIndex(e=>e._id==id); 
    }

    function errHandler(err){
        console.log(err);
    }

    function updateQuantity(id,quantity){
    	return function(){
            var index = findItemIndex(id);
            basket[index].quantity = quantity;
        }
    }


    return {
    	getItems: getItems,
    	getCountAndTotalPrice: load,
    	deleteItem:function(id){
			$http.delete(`/basket/${id}`).then(
    			deleteItem(id),
	    		errHandler
	    	);
		},
		clearBasket:function(){
			$http.delete('/basket').then(
    			res=>basket.splice(0,basket.length),
    			errHandler
	    	);
		},
		setCheckQuantity:function(item){
			$http.put('/basket',item).then(
	    		updateQuantity(item._id,item.quantity),
	    		errHandler
	    	);
		}
    }
});
