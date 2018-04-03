var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var BD_URI = process.env.MONGODB_URI || 'mongodb://localhost/internetShop';
mongoose.connect(BD_URI, { useMongoClient: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("Connected!!!")
});

module.exports = mongoose;