module.exports = function(){

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var dependente = new Schema({
		idPai: String,
		numeroDependente: String,
		nomeDependente: String,
		telefoneDependente: String,
		vinculoDependente: String
	})

	return mongoose.model('Dependente', dependente);
};