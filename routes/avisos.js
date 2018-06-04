module.exports = function(app){
	
	var avisos = app.controllers.avisos; // pega da pasta controllers, o controllers esta setado em load

 	app.get('/avisos', require('connect-ensure-login').ensureLoggedIn(), avisos.avisos);
 	app.get('/avisos/cadastrar', require('connect-ensure-login').ensureLoggedIn(), avisos.cadastrar);
 	app.get('/avisos/teste', require('connect-ensure-login').ensureLoggedIn(), avisos.teste);

 	app.get('/avisos/editar/:id', require('connect-ensure-login').ensureLoggedIn(), avisos.editar);

 	app.post('/avisos/cadastrarCad', avisos.cadastrarCad);

 	// app.post('/avisos/testeEmail', avisos.testeEmail);

 	app.post('/avisos/comentario', avisos.comentario);

 	app.post('/avisos/editarCad/:id', avisos.editarCad);

 	app.get('/avisos/deletar/:id', require('connect-ensure-login').ensureLoggedIn(), avisos.deletar);

 	app.get('/avisos/json', avisos.json);
 	
 	app.get('/aviso/:id', require('connect-ensure-login').ensureLoggedIn(), avisos.aviso);

};