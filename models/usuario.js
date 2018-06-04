module.exports = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var usuario = new Schema({
		tipoConta: String,
		nome: String,
		cpf: String,
		rua: String,
		numeroCasa: String,
		email: String,
		mensalidade: String,
		password: String,
		dataVencimento: String,
		celular: String,
		fixo: String,
		comercial: String,
		impresso: String,
		dataMesAtual: String,
		unidade: String

	});

	return mongoose.model('Usuario', usuario);
};

