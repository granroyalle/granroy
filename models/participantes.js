module.exports = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var participantes = new Schema({
		idUser: String,
		nomeUserP: String,
		idmodalidadeReserva: String,
		numeroParticipante: String,
		nomeParticipante: String,
		rgParticipante: String
	})

	return mongoose.model('Participantes', participantes);
};
