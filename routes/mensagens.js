module.exports = function(app){

	var mensagens = app.controllers.mensagens; // pega da pasta controllers, o controllers esta setado em load
	var Mensagem = app.models.mensagens;
	var Usuario = app.models.usuario;

 	app.get('/mensagens', require('connect-ensure-login').ensureLoggedIn(), mensagens.mensagens);

 	app.get('/mensagem/enviadas', require('connect-ensure-login').ensureLoggedIn(), mensagens.enviadas);

	app.post('/enviarMensagem', mensagens.cadastrarArquivoPdf);

	app.post('/excluirMSG/:id', mensagens.excluirMSG);	

	app.post('/excluirEnviadas/:id', mensagens.excluirEnviadas);		


 // 	var Mensagens = app.models.mensagens;

 // 	var express = require('express');
	// var router = express.Router();
	//
	// var Firebase = require("firebase");
	// var ref = new Firebase("https://nodejsuploader.firebaseio.com/");
	// var filesRef = ref.child('files');

	// var multer  = require('multer');
	// var storage = multer.diskStorage({
	// 	destination: function(req, file, cb){
	// 		cb(null, 'public/uploadsMensagens');
	// 	},
	// 	filename: function(req, file, cb){
	// 		var ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);
	// 		cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
	// 	}
	// });
	// var upload = multer({ storage: storage });

	// app.post('/enviarMensagem', upload.single('anexo'), function (req, res, next) {
	// 	var model = new Mensagens();
	// 	model.remetente = req.body.remetente;
	// 	model.destinatario = req.body.destinatario;
	// 	model.assunto = req.body.assunto;
	// 	model.mensagem = req.body.mensagem;
	// 	model.dataAtual = req.body.dataAtual;
	// 	if(req.file != null){
	// 		model.anexo = req.file.filename;
	// 	}
	// 	model.save(function(err){
	// 		if (err) {
	// 			console.log(err);
	// 		}
	//
	// 		Usuario.find(function(err, dataUsuario){
	// 			if (err) {
	// 				console.log('Deu erro aqui'+err);
	// 			}
	// 			var api_key = 'key-138b2b333f336e21a8883494a4fe82eb';
	// 			var domain = 'granroyallepousoalegre.com.br';
	// 			var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
	//
	// 			if (req.body.destinatario == 'Todos'){
	// 				for (var i = 0; i < req.body.emails.length; i++) {
	// 					var data = {
	// 						from: 'Gran Royalle <granroyallepousoalegre@gmail.com>',
	// 						to: req.body.emails[i],
	// 						subject: 'Nova mensagem do administrador',
	// 						text: 'Chegou uma nova mensagem é só seguir o link para ver: http://www.granroyallepousoalegre.com.br/mensagens/'
	// 					};
	// 					mailgun.messages().send(data, function (error, body) {
	// 						console.log(body);
	// 					});
	//
	// 					res.write('<script>alert("Mensagem enviada com sucesso!"); window.location="../mensagem/enviadas"</script>');
	// 				}
	// 			} else {
	// 					var data = {
	// 						from: 'Gran Royalle <granroyallepousoalegre@gmail.com>',
	// 						to: req.body.destinatario,
	// 						subject: 'Nova mensagem do administrador para você',
	// 						text: 'Chegou uma nova mensagem é só seguir o link para ver: http://www.granroyallepousoalegre.com.br/mensagens/'
	// 					};
	// 					mailgun.messages().send(data, function (error, body) {
	// 						console.log(body);
	// 					});
	// 					res.write('<script>alert("Mensagem enviada com sucesso!"); window.location="../mensagem/enviadas"</script>');
	// 			}
	// 		});
	// 	});
	// });



};
