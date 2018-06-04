module.exports = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var reservasQuadra = new Schema({
		idUser: String,
		title: String,
		data: String,
		start: String,
		end: String,
		horaInicio: String,
		horaTermino: String,
		modalidade: String,
		url: String
	});

	return mongoose.model('ReservasQuadra', reservasQuadra);
};