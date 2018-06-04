// var nodemailer = require('nodemailer');

// // create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport('smtps://italomouraag3%40gmail.com:k3uid5ik@smtp.gmail.com');

// // setup e-mail data with unicode symbols
// var mailOptions = {
//     from: '"Fred Foo 👥" <italomouraag3@gmail.com>', // sender address
//     to: 'atendimento@ag3ag.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world 🐴', // plaintext body
//     html: '<b>Hello world 🐴</b>' // html body
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         console.log(error);
//     }
//     console.log('Message sent: ' + info);
// });