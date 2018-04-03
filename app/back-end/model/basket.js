var mongoose = require('../configuration/mongoose');

var basketSchema = mongoose.Schema({
    name:String,
    price: Number,
    quantity: Number,
    size: String,
    // _id: String,
    img: String
});


var Basket = mongoose.model('basket',basketSchema);
// Basket.find().exec().then(
//     res=>console.log(res),
//     err=>console.log(err)
// );


module.exports = {
	Basket:Basket,
	BasketSchema:basketSchema
};