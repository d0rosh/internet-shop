var mongoose = require('../configuration/mongoose');

var categorySchema = mongoose.Schema({
    name:{type:String},
    img: {type:String},
    sex:{type:String}
});
var Category = mongoose.model('categories', categorySchema);

module.exports = Category;