var moment = require('moment');
var string = require('string');

module.exports = function(app) {
 	
	var Noticia = app.models.noticia;
	var Usuarios = app.models.usuario;
	var Avisos = app.models.avisos;
	var Documentos = app.models.documentos;
	var nomeDocumento = app.models.nomeDocumento;

 	var IndexController = {
		index: function(req,res) {
			Noticia.find().sort( {'_id': -1} ).limit(2).exec(function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				Avisos.find().sort( {'_id': -1} ).limit(2).exec(function(err, data2){

					if (err) {
						console.log('Deu erro aqui'+err);
					}
					nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
						if (err) {
							console.log('Deu erro aqui'+err);
						}
						res.render("index", {listaNoticia: data, moment: moment, user: req.user, listaAvisos: data2, string: string, listaDocumentos: data3});
					});
				});
			});
		}
 	}
 	return IndexController;
}