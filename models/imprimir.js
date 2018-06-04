module.exports = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var imprimir = new Schema({
		impresso: String,
		usuario: String,
		dataAtual: String
	});

	return mongoose.model('Imprimir', imprimir);
};

