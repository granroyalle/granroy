module.exports = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var avisos = new Schema({
		titulo: String,
		data: String,
		urlAmigavel: String,
		descricao: String
	});

	return mongoose.model('Avisos', avisos);
};

