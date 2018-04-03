require('./configuration/middleware');
require('./controller/user');
require('./controller/basket');
require('./controller/item');
require('./controller/category');
require('./mailer/mail');

// var app = require('./configuration/app').app;
// var mailer = require('express-mailer');

// mailer.extend(app, {
//   from: 'no-reply@example.com',
//   host: 'smtp.gmail.com', 
//   secureConnection: true, 
//   port: 465, 
//   transportMethod: 'SMTP',
//   auth: {
//     user: 'andrew13dorosh@gmail.com',
//     pass: 'phantom13'
//   }
// });

// app.get('/render-mail', function (req, res) {
//     app.set('views', __dirname + '/views');
//     app.set('view engine', 'jade');

//     app.mailer.send('email', {
//         to: 'andrew13dorosh@gmail.com',  
//         subject: 'Test Email', 
//         otherProperty: 'Other Property'
//       }, function (err) {
//         if (err) {
//           // handle error 
//           console.log(err);
//         }

//     });
// });


