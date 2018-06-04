module.exports = function(app){
	
	var boletos = app.controllers.boletos; // pega da pasta controllers, o controllers esta setado em load

 	app.get('/boletos', require('connect-ensure-login').ensureLoggedIn(), boletos.boletos);
 	app.get('/boletoBanco', require('connect-ensure-login').ensureLoggedIn(), boletos.boletoBanco);

 	app.post('/boletos/geradorBoleto', boletos.geradorBoleto);

 	app.post('/boletos/usuarioImprimiu/:id', boletos.usuarioImprimiu);
};