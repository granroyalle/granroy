module.exports = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var noticia = new Schema({
		titulo: String,
		descricao: String,
		data: String,
		urlAmigavel: String,
		foto: String
	});

	return mongoose.model('Noticia', noticia);
};

