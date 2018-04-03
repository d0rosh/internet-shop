var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var config = require('./app');
var app = config.app;
var express = config.express;
app.use(express.static('app/front-end'));
app.use(express.static('node_modules/jquery'));
app.use(express.static('node_modules/angular'));
app.use(express.static('node_modules/angular-route'));
app.use(express.static('node_modules/ngstorage'));
app.use(express.static('node_modules/bootstrap'));
app.use(express.static('node_modules/font-awesome'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'jgchgfgxxfdx',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 6000000
    }
}));


app.use((req, resp, next) => {
    if (req.cookies && req.cookies.user_sid && !req.session.user) {
        resp.clearCookie('user_sid');
    }

    next();
});



var preAuth = function(req, resp, next){
    if(req.session && req.session.user){
        return next();
    }else{
        return resp.sendStatus(401);
    }
}


module.exports = {
    preAuth:preAuth
};