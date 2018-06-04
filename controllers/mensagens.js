var moment = require('moment');
var string = require('string');

module.exports = function(app) {

	var Usuario = app.models.usuario;
	var Mensagens = app.models.mensagens;
	var nomeDocumento = app.models.nomeDocumento;

  var gcloud = require('gcloud');
  var config = require('../config');

  var storage = gcloud.storage({
    projectId: config.projectId,
    keyFilename: config.keyFilename
  });

  var dataset = gcloud.storage({
    projectId: config.projectId,
    keyFilename: config.keyFilename
  });

  var bucket = storage.bucket(config.bucketName);

  function uploadCoverImage(coverImageData, extension, remetente, destinatario, destinatario_id, assunto, mensagem, dataAtual, emails, callback) {
    // Generate a unique filename for this image
    var filename = 'mensagem-' + new Date().getTime() + "." + extension
    var file = bucket.file(filename);
    var imageUrl = 'https://' + config.bucketName + '.storage.googleapis.com/' + filename;
    var stream = file.createWriteStream();
    stream.on('error', callback);
    stream.on('finish', function() {
      // Set this file to be publicly readable
      file.makePublic(function(err) {
          if (err) return callback(err);
          callback(null, imageUrl);
      });
    });
    stream.end(coverImageData);
    if (destinatario == 'Todos'){
        for (var i = 0; i < emails.length; i++) {
          var model = new Mensagens();
          model.remetente = remetente;
          model.repeticao = destinatario;            
          model.destinatario = emails[i];
          model.assunto = assunto;
          model.mensagem = mensagem;
          model.dataAtual = dataAtual;
          model.anexo = filename;
          model.save(function(err){
            if (err) {
              console.log(err);
            }
            Usuario.find(function(err, dataUsuario){
              if (err) {
                console.log('Deu erro aqui'+err);
              }
            });
          });
        }
        var api_key = 'key-138b2b333f336e21a8883494a4fe82eb';
        var domain = 'granroyallepousoalegre.com.br';
        var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
        for (var z = 0; z < emails.length; z++) {
          console.log(emails[z]);
          var data = {
            from: 'Gran Royalle <granroyallepousoalegre@gmail.com>',
            to: emails[z],
            subject: 'Nova mensagem do administrador',
            text: 'Chegou uma nova mensagem é só seguir o link para ver: http://www.granroyallepousoalegre.com.br/mensagens/'
          };
          mailgun.messages().send(data, function (error, body) {
            console.log(body);
          });
        }
      } else {
          var model = new Mensagens();
          model.remetente = remetente;
          model.destinatario = destinatario;
          model.assunto = assunto;
          model.mensagem = mensagem;
          model.dataAtual = dataAtual;
          model.anexo = filename;
          model.save(function(err){
            if (err) {
              console.log(err);
            }
          Usuario.find(function(err, dataUsuario){
            if (err) {
              console.log('Deu erro aqui'+err);
            }
            var api_key = 'key-138b2b333f336e21a8883494a4fe82eb';
            var domain = 'granroyallepousoalegre.com.br';
            var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
            var data = {
              from: 'Gran Royalle <granroyallepousoalegre@gmail.com>',
              to: destinatario,
              subject: 'Nova mensagem do administrador para você',
              text: 'Chegou uma nova mensagem é só seguir o link para ver: http://www.granroyallepousoalegre.com.br/mensagens/'
            };
            mailgun.messages().send(data, function (error, body) {
              console.log(body);
            });
          });
        });
    }
  }

 	var MensagensController = {
		mensagens: function(req,res) {
			Usuario.find(function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				Usuario.find(function(err, data2){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					Mensagens.find().sort( {'_id': -1} ).exec(function(err, data3){
						if (err) {
							console.log('Deu erro aqui'+err);
						}
						Usuario.findById({"_id": req.user._id}, function(err, data4){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
							nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data5){
								if (err) {
									console.log('Deu erro aqui'+err);
								}
								res.render("mensagem/mensagens", {string: string, listaUsuarios: data, remetente: data2, listaMensagens: data3, listaUsuario: data4, user: req.user, moment: moment, dataAtual: new Date(), usuarios: Usuario.find.lenght, listaDocumentos: data5});
							});
						});
					});
				});
			});
		},
		enviadas: function(req,res) {
			Usuario.find(function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				Usuario.find(function(err, data2){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					Mensagens.find().sort( {'_id': -1} ).exec(function(err, data3){
						if (err) {
							console.log('Deu erro aqui'+err);
						}
						Usuario.findById({"_id": req.user._id}, function(err, data4){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
							nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data5){
								if (err) {
									console.log('Deu erro aqui'+err);
								}
								res.render("mensagem/enviadas", {string: string, listaUsuarios: data, remetente: data2, listaMensagens: data3, listaUsuario: data4, user: req.user, moment: moment, dataAtual: new Date(), listaDocumentos: data5});
							});
						});
					});
				});
			});
		},
    cadastrarArquivoPdf: function(req, res, next) {
      if(req.files['anexo'] != null){
        var coverImageData;
         var extension = req.files['anexo'].extension;
         var remetente = req.body.remetente;
         var destinatario = req.body.destinatario;            
         var destinatario_id = req.body.destinatario_id;
         var assunto = req.body.assunto;
         var mensagem = req.body.mensagem;
         var dataAtual = req.body.dataAtual;
         var emails = req.body.emails;
          if (req.files['anexo'])
            coverImageData = req.files['anexo'].buffer;


          if (coverImageData)
            uploadCoverImage(coverImageData, extension, remetente, destinatario, destinatario_id, assunto, mensagem, dataAtual, emails, function(err, imageUrl) {
              // if (err) return callback(err);
              res.write('<script>alert("Mensagem enviada com sucesso!"); window.location="../mensagem/enviadas"</script>');


            });
      } else {
        if (req.body.destinatario == 'Todos'){
          for (var i = 0; i < req.body.emails.length; i++) {
            var model = new Mensagens();
            model.remetente = req.body.remetente;
            model.repeticao = req.body.destinatario;            
            model.destinatario = req.body.destinatario_id[i];
            model.assunto = req.body.assunto;
            model.mensagem = req.body.mensagem;
            model.dataAtual = req.body.dataAtual;
            model.save(function(err){
              if (err) {
                console.log(err);
              }
              Usuario.find(function(err, dataUsuario){
                if (err) {
                  console.log('Deu erro aqui'+err);
                }
                // } else {
                //   var data = {
                //     from: 'Gran Royalle <granroyallepousoalegre@gmail.com>',
                //     to: req.body.destinatario,
                //     subject: 'Nova mensagem do administrador para você',
                //     text: 'Chegou uma nova mensagem é só seguir o link para ver: http://www.granroyallepousoalegre.com.br/mensagens/'
                //   };
                //   mailgun.messages().send(data, function (error, body) {
                //     console.log(body);
                //   });
                //   res.write('<script>alert("Mensagem enviada com sucesso!"); window.location="../mensagem/enviadas"</script>');
                // }
              });
            });
          }
          var api_key = 'key-138b2b333f336e21a8883494a4fe82eb';
          var domain = 'granroyallepousoalegre.com.br';
          var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
          for (var z = 0; z < req.body.emails.length; z++) {
            console.log(req.body.emails[z]);
          var data = {
            from: 'Gran Royalle <granroyallepousoalegre@gmail.com>',
            to: req.body.emails[z],
            subject: 'Nova mensagem do administrador',
            text: 'Chegou uma nova mensagem é só seguir o link para ver: http://www.granroyallepousoalegre.com.br/mensagens/'
          };
          mailgun.messages().send(data, function (error, body) {
            console.log(body);
          });
          }

          res.write('<script>alert("Mensagem enviada com sucesso!"); window.location="../mensagem/enviadas"</script>');
        } else {
            var model = new Mensagens();
            model.remetente = req.body.remetente;
            model.destinatario = req.body.destinatario;
            model.assunto = req.body.assunto;
            model.mensagem = req.body.mensagem;
            model.dataAtual = req.body.dataAtual;
            model.save(function(err){
              if (err) {
                console.log(err);
              }
            Usuario.find(function(err, dataUsuario){
              if (err) {
                console.log('Deu erro aqui'+err);
              }
              var api_key = 'key-138b2b333f336e21a8883494a4fe82eb';
              var domain = 'granroyallepousoalegre.com.br';
              var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
              var data = {
                from: 'Gran Royalle <granroyallepousoalegre@gmail.com>',
                to: req.body.destinatario,
                subject: 'Nova mensagem do administrador para você',
                text: 'Chegou uma nova mensagem é só seguir o link para ver: http://www.granroyallepousoalegre.com.br/mensagens/'
              };
              mailgun.messages().send(data, function (error, body) {
                console.log(body);
              });
              res.write('<script>alert("Mensagem enviada com sucesso!"); window.location="../mensagem/enviadas"</script>');
            });
         });
      }
    }
   },
   excluirMSG: function(req,res){
			Mensagens.findById(req.params.id, function(err, data){
				if (err) {
					console.log(err);
				}else {
					var model = data;
					model.status_mensagem = req.body.status_mensagem;
					model.save(function(err){
						if (err) {
							console.log(err);
							res.write('<script>alert("Falha ao tentar excluir mensagem"); window.location="../mensagens"</script>');
						} else{
							res.write('<script>alert("Mensagem deletada com sucesso!"); window.location="../mensagens"</script>');
						}
					});
				}
			});
		},
    excluirEnviadas: function(req,res){
			Mensagens.findById(req.params.id, function(err, data){
				if (err) {
					console.log(err);
				}else {
					var model = data;
					model.status_enviadas = req.body.status_enviadas;
					model.save(function(err){
						if (err) {
							console.log(err);
							res.write('<script>alert("Falha ao tentar excluir mensagem"); window.location="../mensagem/enviadas"</script>');
						} else{
							res.write('<script>alert("Mensagem deletada com sucesso!"); window.location="../mensagem/enviadas"</script>');
						}
					});
				}
			});
		}
  }
 	return MensagensController;
}
