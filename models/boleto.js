module.exports = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var boleto = new Schema({
		impresso: String,
		condomino: String,
		mensalidade: String,
		vencimento: String,
		gerado: String,
		dataAtual: String
	});

	return mongoose.model('Boleto', boleto);
};