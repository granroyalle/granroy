module.exports = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var mensagens = new Schema({
		remetente: String,
		repeticao: String,
		destinatario: String,
		assunto: String,
		mensagem: String,
		dataAtual: String,
		anexo: String,
		status_mensagem: String,
		status_enviadas: String
	});

	return mongoose.model('Mensagens', mensagens);
};

