var express = require('express');
var app = express();

var port = process.env.PORT || 30013;
app.listen(port, function(){
    console.log(`Server listen port ${port}`);
});

module.exports = {
    express:express,
    app:app
};