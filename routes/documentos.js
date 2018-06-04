module.exports = function(app){

	var documentos = app.controllers.documentos;

	app.get('/documentos', require('connect-ensure-login').ensureLoggedIn(), documentos.documentos);

	app.get('/documentos/:id', require('connect-ensure-login').ensureLoggedIn(), documentos.atas);

	app.post('/documentos/nomeDocumento', documentos.nomeDocumentoRegister);

	app.post('/documentos/excluirDocumento/:id', require('connect-ensure-login').ensureLoggedIn(), documentos.excluirDocumento);

	app.post('/documentos/renomearDocumento/:id', require('connect-ensure-login').ensureLoggedIn(), documentos.renomearDocumento);

	app.post('/documentos/excluirAtas/:id', require('connect-ensure-login').ensureLoggedIn(), documentos.excluirAtas);

	app.post('/documentos/renomearAtas/:id', require('connect-ensure-login').ensureLoggedIn(), documentos.renomearAtas);

	app.get('/arquivoPdf/:id', require('connect-ensure-login').ensureLoggedIn(), documentos.arquivoPdf);


	app.post('/documentos/fileArquivo', documentos.cadastrarArquivoPdf);
/*Upload arquivo pdf*/

	var Documentos = app.models.documentos;

	// var express = require('express');
	// var router = express.Router();
	// var Firebase = require("firebase");
	// var ref = new Firebase("https://nodejsuploader.firebaseio.com/");
	// var filesRef = ref.child('files');
	// var multer  = require('multer');
	// var storage = multer.diskStorage({
	// 	destination: function(req, file, cb){
	// 		cb(null, 'public/arquivoPdf');
	// 	},
	// 	filename: function(req, file, cb){
	// 		var ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);
	// 		cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
	// 	}
	// });
	// var upload = multer({ storage: storage });

	// app.post('/documentos/file', upload.single('arquivoPdf'), function (req, res, next) {
	// 	var model = new Documentos();
	// 	model.fkDocumentos = req.body.fkDocumentos;
	// 	model.titulo = req.body.tituloDocumento;
	// 	model.arquivo = req.file.filename;
	// 	model.save(function(err){
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 		//console.log(req.body);
	// 		res.redirect('/documentos');
	// 	});
	// });

/*ENVIO DE E-MAIL*/

	app.get('/enviarMensagem', function (req, res) {
		// var helper = require('sendgrid').mail

		// from_email = new helper.Email("granroyallepousoalegre@gmail.com")
		// to_email = new helper.Email("italomouraag3@gmail.com")
		// subject = "Sending with SendGrid is Fun"
		// content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js")
		// mail = new helper.Mail(from_email, subject, to_email, content)

		// var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
		// var request = sg.emptyRequest({
		//   method: 'POST',
		//   path: '/v3/mail/send',
		//   body: mail.toJSON()
		// });

		// sg.API(request, function(error, response) {
		//   console.log(response.statusCode)
		//   console.log(response.body)
		//   console.log(response.headers)
		// })
		var api_key = 'key-138b2b333f336e21a8883494a4fe82eb';
		var domain = 'postmaster@sandbox5184893ec4ee43c0a294acfe590a7a5f.mailgun.org';
		var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

		var data = {
		  from: 'Gran Royalle <granroyallepousoalegre@gmail.com>',
		  to: 'granroyallepousoalegre@gmail.com',
		  subject: 'Hello Gran Node JS ♥',
		  text: 'Teste de envio de E-mail!'
		};

		mailgun.messages().send(data, function (error, body) {
		  console.log(body);
		});
	});
}

//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
