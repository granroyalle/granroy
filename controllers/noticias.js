var moment = require('moment');
var string = require('string');

module.exports = function(app) {

	var Noticia = app.models.noticia;
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

  function uploadCoverImage(coverImageData, extension, titulo, descricao, data, callback) {
    // Generate a unique filename for this image
    var filename = 'noticias-' + new Date().getTime() + "." + extension
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
    var model = new Noticia();
    model.titulo = titulo;
    model.descricao = descricao;
    model.data = data;
    model.foto = filename;
    model.save(function(err){
      if (err) {
        console.log(err);
      }
    });
  }

	function uploadEditCoverImage(coverImageData, extension, titulo, descricao, dataAtual, id, callback) {
    // Generate a unique filename for this image
    var filename = 'noticias-' + new Date().getTime() + "." + extension
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
		Noticia.findById(id, function(err, data){
			if (err) {
				console.log(err);
			} else {
		    var model = data;
		    model.titulo = titulo;
		    model.descricao = descricao;
		    model.data = dataAtual;
		    model.foto = filename;
		    model.save(function(err){
		      if (err) {
		        console.log(err);
		      }
		    });
		}
  });
}

 	var NoticiasController = {
		noticias: function(req,res) {
			Noticia.find().sort( {'_id': -1} ).exec(function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					res.render("noticias/noticias", {string: string, listaNoticia: data, moment: moment, user: req.user, listaDocumentos: data3});
				});
			});
		},
		cadastrar: function(req,res) {
			nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				res.render("noticias/cadastrar", {user: req.user, listaDocumentos: data});
			});
		},
		// cadastrarCad: function(req,res) {
		// 	var model = new Noticia(req.body);
		// 	model.save(function(err){
		// 		if (err) {
		// 			console.log(err);
		// 		}
		// 		res.redirect('/noticias');
		// 	});
		// },
		editar: function(req,res) {
			Noticia.findById(req.params.id, function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					res.render("noticias/editar", {mostrar: data, user: req.user, listaDocumentos: data3});
				});
			});
		},

 	// 	editarCad: function(req,res){
		// 	Noticia.findById(req.params.id, function(err, data){
		// 		if (err) {
		// 			console.log(err);
		// 		}else {
		// 			var model = data;
		// 			model.data = req.body.data;
		// 			model.titulo = req.body.titulo;
		// 			model.urlAmigavel = req.body.urlAmigavel;
		// 			model.descricao = req.body.descricao;
		// 			model.save(function(err){
		// 				if (err) {
		// 					console.log(err);
		// 				} else{
		// 					res.redirect("/noticias");
		// 				}
		// 			});
		// 		}
		// 	});
		// },
		cadastrarArquivoPdf: function(req, res, next) {
			if(req.files['anexo'] != null){
				var coverImageData;
				var extension = req.files['anexo'].extension;
				var titulo = req.body.titulo;
				var descricao = req.body.descricao;
				var data = req.body.data;
				var id = req.body.id;
				if (req.files['anexo'])
					coverImageData = req.files['anexo'].buffer;


				if (coverImageData)
					uploadCoverImage(coverImageData, extension, titulo, descricao, data, function(err, imageUrl) {
						// if (err) return callback(err);
						res.write('<script>alert("Noticia cadastrada com sucesso!"); window.location="../noticias"</script>');

					});
			} else {
					var model = new Noticia();
					model.titulo = req.body.titulo;
					model.descricao = req.body.descricao;
					model.data = req.body.data;
					model.save(function(err){
						if (err) {
							console.log(err);
						}
						res.write('<script>alert("Noticia cadastrada com sucesso!"); window.location="../noticias"</script>');
				});
			}
    },
		editarArquivoPdf: function(req, res, next) {
			if(req.files['anexo'] != null){
				var coverImageData;
				var extension = req.files['anexo'].extension;
				var titulo = req.body.titulo;
				var descricao = req.body.descricao;
				var dataAtual = req.body.data;
				var id = req.body.id;
				if (req.files['anexo'])
				  coverImageData = req.files['anexo'].buffer;


				if (coverImageData)
				  uploadEditCoverImage(coverImageData, extension, titulo, descricao, dataAtual, id, function(err, imageUrl) {
				    // if (err) return callback(err);
				    res.write('<script>alert("Noticia editada com sucesso!"); window.location="../noticias"</script>');

				  });
			} else {
				Noticia.findById(req.body.id, function(err, data){
					if (err) {
						console.log(err);
					} else {
				    var model = data;
				    model.titulo = req.body.titulo;
				    model.descricao = req.body.descricao;
				    model.data = req.body.data;
				    model.save(function(err){
				      if (err) {
				        console.log(err);
				      }
							res.write('<script>alert("Noticia editada com sucesso!"); window.location="../noticias"</script>');
				    });
				}
			});
    }
	},
		noticia: function(req,res) {
			Noticia.findById(req.params.id, function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					res.render("noticias/noticia", {valor: data, user: req.user, listaDocumentos: data3});
				});
			})
		},
		deletar: function(req,res){
			Noticia.remove({_id: req.params.id}, function(err){
				if (err) {
					console.log(err);
					res.write('<script>alert("Falha ao exlcuir a noticia!"); window.location="../../noticias"</script>');
				} else {
					res.write('<script>alert("Notícia deletada com sucesso!"); window.location="../../noticias"</script>');
				}
			});
		}
 	}
 	return NoticiasController;
}
