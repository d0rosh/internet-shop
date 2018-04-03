app.factory('authServices', function($http){
	var auth = true;
	var role = '';
    return {
        getAuth: function(){
            return $http.post('/current/user');
        },
        getUser: function(){
        	return auth;
        },
        getRole: function(){
        	return role;
        }
    };
});
