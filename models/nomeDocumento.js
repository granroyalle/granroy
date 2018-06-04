module.exports = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var nomeDocumento = new Schema({
		tituloDocumento: String
	});

	return mongoose.model('NomeDocumento', nomeDocumento);
};