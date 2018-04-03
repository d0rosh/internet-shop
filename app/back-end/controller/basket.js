var app = require('../configuration/app').app;
var Basket = require('../model/basket').Basket;
var User = require('../model/user');
// var preAuth = require('../configuration/middleware').preAuth;


app.post('/basket', function(req, resp){
    // resp.cookie('cokkieName','ggggggggggggggg', { maxAge: 900000, httpOnly: false })
    User.findOne({_id:req.session.user._id}).exec().then(
        user=>{
            var item = {"name": req.body.name, "price": req.body.price, "size":req.body.size, "quantity": req.body.quantity || 1, "_id": req.body._id, "img":req.body.img};
            User.updateOne(
                {login:user.login},
                {$push:{
                    basket: item
                }}
            ).then(
                res=>resp.json(item),
                err=>{
                    console.log(err);
                }
            )
        },
        err=>{
            console.log('!!!!!!!');
            console.log(err);
        }
    );
});


app.get('/basket', function(req, resp){
    User.findOne({_id:req.session.user._id}).exec().then(
        res=>resp.json(res),
        err=>resp.sendStatus(500)
    )
});

app.delete('/basket/:id', function(req, resp){
    User.findOne({_id:req.session.user._id}).exec().then(
        user=>{
            User.findByIdAndUpdate({_id:req.session.user._id}, {
                $pull: {basket: {
                    _id: req.params.id
                }}
            }, function (err, docs) {
                if (err) {
                  resp.sendStatus(500)
                } else {
                  resp.sendStatus(204)
                }
            });
        }
    )
});

app.delete('/basket', function(req, resp){
    User.findOne({_id:req.session.user._id}).exec().then(
        user=>{
             User.updateOne(
                {login:user.login},
                {$set:{
                    basket: []
                }}
            ).then(
                res=>resp.sendStatus(204),
                err=>resp.sendStatus(500)
            )
        }
    )
});

app.put('/basket', function(req, resp){
    User.findOne({_id:req.session.user._id}).exec().then(
        user=>{
            User.findOneAndUpdate({
                '_id': user._id,
                'basket': {
                $elemMatch: {
                  'name': req.body.name
                }
                },
            }, {
                $set: {
                  'basket.$.quantity': req.body.quantity
                }
                }, {
                  new: true
                }, function (err, docs) {
                if (err) {
                  resp.sendStatus(500)
                } else {
                  resp.sendStatus(204)
                }
            });
        },
        err=>{
            resp.sendStatus(500);
        }
    )
});