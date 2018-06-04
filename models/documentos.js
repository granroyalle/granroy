module.exports = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var documentos = new Schema({
		fkDocumentos: String,
		titulo: String,
		arquivo: String
	});

	return mongoose.model('Documentos', documentos);
};

