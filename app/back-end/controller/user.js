var app = require('../configuration/app').app;
var User = require('../model/user');
var preAuth = require('../configuration/middleware').preAuth;

app.post('/current/user', preAuth, function(req, resp){
    resp.json(req.session.user);
});
app.post('/current/user/destroy', preAuth, function(req,resp){
    req.session.cookie.expires = '2000-12-17T23:44:26.305Z';
    resp.clearCookie('user_sid');
    resp.json(req.session.user);
});

app.post('/registration', function(req, resp){
    var user = new User(req.body);
    user.validate(
        function(err){
            if(err) {
                resp.status(400).json(err);
            }else{
                user.save().then(
                    res=>resp.sendStatus(204),
                    err=>resp.sendStatus(500)
                );
            }
        }
    );
});

app.post('/login', function(req, resp){
    User.findOne({login:req.body.login}).exec().then(
        user=>{
            if(!user) resp.sendStatus(401);
            user.checkPassword(req.body.password).then(
                res=>{
                    if(res){
                        req.session.user = user;
                        resp.sendStatus(204);
                    }else{
                        resp.sendStatus(401);
                    }
                },
                err=>console.log(err)
            );
        },
        err=>console.log(err)
    );
});