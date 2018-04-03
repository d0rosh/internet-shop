var mongoose = require('../configuration/mongoose');

var itemSchema = mongoose.Schema({
    name:{type:String},
    img:{type:String},
    category:{
        _id:String,
        name:String
    },
    price: Number,
    size: String,
    countToBuy: {
        type: Number,
        default: 0
    },
    season: String

});
var Item = mongoose.model('items',itemSchema);

module.exports = Item;