var app = require('../configuration/app').app;
var Category = require('../model/category');

app.get('/categories', function(req, resp){
    Category.find().exec().then(
        res=>resp.json(res),
        err=>resp.sendStatus(500)
    );
});

app.post('/categories', function(req, resp){
    new Category(req.body).save().then(
        res=>resp.sendStatus(204),
        err=>resp.sendStatus(500)
    );
});
