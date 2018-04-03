var app = require('../configuration/app').app;
var Item = require('../model/item');

app.post('/items', function(req, resp){
    new Item(req.body).save().then(

        res=>resp.sendStatus(204),
        err=>resp.sendStatus(500)
    );
});

app.get('/items/:name', function(req, resp){
    Item.find({'category.name':req.params.name}).exec().then(
        res=>resp.json(res),
        err=>resp.sendStatus(500)
    );
});
app.get('/items/:name/:id', function(req, resp){
    Item.find({_id:req.params.id}).exec().then(
        res=>resp.json(res),
        err=>resp.sendStatus(500)
    );
});


// Item.find({}).exec().then(
//     res=>console.log(res),
//     err=>console.log(err)
// )
