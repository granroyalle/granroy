module.exports = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var comentario = new Schema({
		idAviso: String,
		idUser: String,
		nomeUser: String,
		comentario: String
	});

	return mongoose.model('Comentario', comentario);
};

