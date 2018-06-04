var moment = require('moment');
var calendar = require('node-calendar');
var cal = new calendar.Calendar(calendar.SUNDAY);
var yearCalendar = cal.yeardayscalendar(2004);

module.exports = function(app) {

	var Avisos = app.models.avisos;
	var Comentario = app.models.comentario;
	var nomeDocumento = app.models.nomeDocumento;
	var Usuario = app.models.usuario;

 	var AvisosController = {
		avisos: function(req,res) {
			Avisos.find().sort( {'_id': -1} ).exec(function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					res.render("avisos/avisos", {listaAvisos: data, user: req.user, moment: moment, listaDocumentos: data3});
				});
			});
		},
		cadastrar: function(req,res) {
			Usuario.find(function(err, data2){
				if (err) {
					console.log(err);
				}
				nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					res.render("avisos/cadastrar", {user: req.user, listaDocumentos: data3, listaEmails: data2});
				});
			});
		},
		cadastrarCad: function(req,res) {
			var model = new Avisos;
			model.data = req.body.data;
			model.titulo = req.body.titulo;
			model.descricao = req.body.descricao;
			model.save(function(err){
				if (err) {
					console.log(err);
					res.write('<script>alert("Falha ao registrar aviso!"); window.location="../avisos"</script>');
				}
				Avisos.findOne().sort( {'_id': -1} ).exec(function(err, dataAviso){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					var api_key = 'key-138b2b333f336e21a8883494a4fe82eb';
					var domain = 'granroyallepousoalegre.com.br';
					var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

					for (var i = 0; i < req.body.emails.length; i++) {
						var data = {
						  from: 'Gran Royalle <granroyallepousoalegre@gmail.com>',
						  to: req.body.emails[i],
						  subject: 'Novo aviso Gran Royalle ♥',
						  text: 'Chegou um novo aviso é só seguir o link para ver: http://www.granroyallepousoalegre.com.br/aviso/'+dataAviso._id+''
						};
					}

					mailgun.messages().send(data, function (error, body) {
					  console.log(body);
					});
					res.write('<script>alert("Aviso registrado com sucesso!"); window.location="../avisos"</script>');
				});
			});
		},
		editar: function(req,res) {
			Avisos.findById(req.params.id, function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					res.render("avisos/editar", {mostrar: data, user: req.user, listaDocumentos: data3});
				});
			});
		},
 		editarCad: function(req,res){
			Avisos.findById(req.params.id, function(err, data){
				if (err) {
					console.log(err);
				}else {
					var model = data;
					model.data = req.body.data;
					model.titulo = req.body.titulo;
					model.urlAmigavel = req.body.urlAmigavel;
					model.descricao = req.body.descricao;
					model.save(function(err){
						if (err) {
							console.log(err);
							res.write('<script>alert("Falha ao editar avisos!"); window.location="../../avisos"</script>');
						} else{
							res.write('<script>alert("Aviso editado com sucesso!"); window.location="../../avisos"</script>');
						}
					});
				}
			});
		},
		json: function(req,res) {
 			Avisos.find(function(err, data){
 				if (err) {
 					console.log(err);
 				}
 					res.json(data);
 			});
 		},
 		aviso: function(req,res) {
			Avisos.findById(req.params.id, function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				Comentario.find({idAviso: req.params.id}, function(err, data2){
					if (err) {
					console.log('Deu erro aqui'+err);
				}
				nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
						res.render("avisos/aviso", {valor: data, user: req.user, listaComentario: data2, listaDocumentos: data3});
					});
				});
			});
		},
 		deletar: function(req,res){
			Avisos.remove({_id: req.params.id}, function(err){
				if (err) {
					console.log(err);
				} else {
					res.write('<script>alert("Aviso editado com sucesso!"); window.location="../../avisos"</script>');
				}
			});
		},
		teste: function(req,res) {
			Avisos.find().sort( {'_id': -1} ).exec(function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				console.log(data);
				res.render("avisos/teste", {listaAvisos: data, user: req.user, moment: moment, calender: calendar});
			});
		},
		comentario: function(req,res) {
			var model = new Comentario(req.body);
			model.save(function(err){
				if (err) {
					console.log(err);
					res.write('<script>alert("Falha ao publicar o comentario!"); window.location="../avisos"</script>');
				}
				Comentario.findOne().sort({'_id': -1}).exec(function(err, data){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					res.redirect('/aviso/'+data.idAviso);
					// res.write('<script>alert("Comentario publicado com sucesso!"); window.location="../../aviso/"+data.idAviso</script>');
				});
			});
		},
		// testeEmail: function(req, res) {
		// 	var nodemailer = require('nodemailer');
		// 	// create reusable transporter object using the default SMTP transport
		// 	var transporter = nodemailer.createTransport('smtps://italo.moura1201%40gmail.com:********@smtp.gmail.com');
		// 	// setup e-mail data with unicode symbols
		// 	var mailOptions = {
		// 	    from: '"Fred Foo 👥" <italo.moura1201@gmail.com>', // sender address
		// 	    to: 'atendimento@ag3ag.com, atendimento@ag3ag.com', // list of receivers
		// 	    subject: 'Hello ✔', // Subject line
		// 	    text: 'Hello world 🐴', // plaintext body
		// 	    html: '<b>Hello world 🐴</b>' // html body
		// 	};

		// 	// send mail with defined transport object
		// 	transporter.sendMail(mailOptions, function(error, info){
		// 	    if(error){
		// 	        return console.log(error);
		// 	    }
		// 	    console.log('Message sent: ' + info.res);
		// 	});
		// }
 	}
 	return AvisosController;
}
