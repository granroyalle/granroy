module.exports = function(app){
	var noticias = app.controllers.noticias; // pega da pasta controllers, o controllers esta setado em load

 	app.get('/noticias', require('connect-ensure-login').ensureLoggedIn(), noticias.noticias);

 	app.get('/noticia/cadastrar', require('connect-ensure-login').ensureLoggedIn(), noticias.cadastrar);

 	app.get('/noticia/editar/:id', require('connect-ensure-login').ensureLoggedIn(), noticias.editar);

 	// app.post('/noticias/cadastrarCad', noticias.cadastrarCad);
 	// app.post('/noticias/editarCad/:id', noticias.editarCad);

 	app.get('/noticias/deletar/:id', require('connect-ensure-login').ensureLoggedIn(), noticias.deletar);

 	app.get('/noticia/:id', require('connect-ensure-login').ensureLoggedIn(), noticias.noticia);

	app.post('/noticia/file', noticias.cadastrarArquivoPdf);

	app.post('/noticia/fileEdit', noticias.editarArquivoPdf);

 	var Noticia = app.models.noticia;

	// var express = require('express');
	// var router = express.Router();
	//
	// var Firebase = require("firebase");
	// var ref = new Firebase("https://nodejsuploader.firebaseio.com/");
	// var filesRef = ref.child('files');
	//
	//
	// var multer  = require('multer');
	// var storage = multer.diskStorage({
	// 	destination: function(req, file, cb){
	// 		cb(null, 'public/uploads');
	// 	},
	// 	filename: function(req, file, cb){
	// 		var ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);
	// 		cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
	// 	}
	// });
	// var upload = multer({ storage: storage });
	//
	//
	// app.post('/noticia/file', upload.single('foto-noticia'), function (req, res, next) {
	// 	var model = new Noticia();
	// 	model.data = req.body.data;
	// 	model.titulo = req.body.titulo;
	// 	model.urlAmigavel = req.body.urlAmigavel;
	// 	model.descricao = req.body.descricao;
	// 	if(req.file != null){
	// 		model.foto = req.file.filename;
	// 	}
	// 	model.save(function(err){
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 		//console.log(req.body);
	// 		res.write('<script>alert("Noticia registrada com sucesso!"); window.location="../noticias"</script>');
	// 	});
	// });

	// app.post('/noticia/fileEdit/:id', upload.single('foto-noticia'), function (req, res, next) {
	// 	Noticia.findById(req.params.id, function(err, data){
	// 		if (err) {
	// 			console.log(err);
	// 		}else {
	// 			var model = data;
	// 			model.data = req.body.data;
	// 			model.titulo = req.body.titulo;
	// 			model.urlAmigavel = req.body.urlAmigavel;
	// 			model.descricao = req.body.descricao;
	// 			if(req.file != null){
	// 				model.foto = req.file.filename;
	// 			}
	// 			model.save(function(err){
	// 				if (err) {
	// 					console.log(err);
	// 				}
	// 				//console.log(req.body);
	// 				res.write('<script>alert("Noticia editada com sucesso!"); window.location="../../noticias"</script>');
	// 			});
	// 		}
	// 	});
	// });


};
