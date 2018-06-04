var string = require('string');
module.exports = function(app) {

	var Documentos = app.models.documentos;
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

  function uploadCoverImage(coverImageData, extension, fkDocumentos, tituloDocumento, callback) {
    // Generate a unique filename for this image
    var filename = 'documento-' + new Date().getTime() + "." + extension
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
    var model = new Documentos();
    model.fkDocumentos = fkDocumentos;
    model.titulo = tituloDocumento;
    model.arquivo = filename;
    model.save(function(err){
      if (err) {
        console.log(err);
      }
    });
  }

 	var DocumentosController = {
		documentos: function(req,res) {
			nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				res.render("documentos/documentos", {user: req.user, listaDocumentos: data});
			});
		},
		atas: function(req,res) {
			Documentos.find({fkDocumentos: req.params.id}, function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				nomeDocumento.findById(req.params.id, function(err, data2){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
						if (err) {
							console.log('Deu erro aqui'+err);
						}
						res.render("documentos/atas", {user: req.user, listaDocumento: data, valor: data2, listaDocumentos: data3, string: string});
					});
				});
			});
		},
		nomeDocumentoRegister: function(req,res) {
			var model = new nomeDocumento(req.body);
			model.save(function(err){
				if (err) {
					console.log(err);
					res.write('<script>alert("Falha ao criar documento!"); window.location="../documentos"</script>');
				}
				res.write('<script>alert("Novo Documento criado com sucesso!"); window.location="../documentos"</script>');
			});
		},
		renomearDocumento: function(req,res){
			nomeDocumento.findById(req.params.id, function(err, data){
				if (err) {
					console.log(err);
				}else {
					var model = data;
					model.tituloDocumento = req.body.tituloDocumento;
					model.save(function(err){
						if (err) {
							console.log(err);
							res.write('<script>alert("Falha ao renomear documento!"); window.location="../../documentos"</script>');
						} else{
							res.write('<script>alert("Documento renomeado com sucesso!"); window.location="../../documentos"</script>');
						}
					});
				}
			});
		},
		excluirDocumento: function(req,res){
			nomeDocumento.remove({_id: req.params.id}, function(err){
				if (err) {
					console.log(err);
					res.write('<script>alert("Falha ao excluir documento!"); window.location="../../documentos"</script>');
				} else {
					res.write('<script>alert("Documento exlcuido com sucesso!"); window.location="../../documentos"</script>');
				}
			});
		},
		renomearAtas: function(req,res){
			Documentos.findById(req.params.id, function(err, data){
				if (err) {
					console.log(err);
				}else {
					var model = data;
					model.titulo = req.body.titulo;
					model.save(function(err){
						if (err) {
							console.log(err);
							res.write('<script>alert("Falha ao renomear documento!"); window.location="../../documentos"</script>');
						} else{
							res.write('<script>alert("Documento renomeado com sucesso!"); window.location="../../documentos"</script>');
						}
					});
				}
			});
		},
		excluirAtas: function(req,res){
			Documentos.remove({_id: req.params.id}, function(err){
				if (err) {
					console.log(err);
					res.write('<script>alert("Falha ao excluir documento!"); window.location="../../documentos"</script>');
				} else {
					res.write('<script>alert("Documento exlcuido com sucesso!"); window.location="../../documentos"</script>');
				}
			});
		},
		arquivoPdf: function(req,res){
			Documentos.find({arquivo: req.params.id}, function(err, data){
				if (err) {
					console.log(err);
				} else {
					res.redirect('public/arquivoPdf/#{data.arquivo}', {user: req.user});
				}
			});
		},

    cadastrarArquivoPdf: function(req, res, next) {
		 var coverImageData;
		 var extension = req.files['arquivo'].extension;
		  if (req.files['arquivo'])
		    coverImageData = req.files['arquivo'].buffer;


		  if (coverImageData)
	      uploadCoverImage(coverImageData, extension, req.body.fkDocumentos, req.body.tituloDocumento, function(err, imageUrl) {
	        // if (err) return callback(err);
	        res.redirect('/documentos');

	      });
		}
 	}
 	return DocumentosController;
}
