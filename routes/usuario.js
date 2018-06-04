module.exports = function(app){	
	var usuario = app.controllers.usuario; // pega da pasta controllers, o controllers esta setado em load

	app.get('/usuario/cadastrarUsuario', usuario.cadastrarUsuario);

	app.get('/usuario/alterarSenha', require('connect-ensure-login').ensureLoggedIn(), usuario.alterarSenha);

	app.get('/usuario/alterarSenha/:id', require('connect-ensure-login').ensureLoggedIn(), usuario.alterarSenha);

	app.get('/usuario/alterarSenhaAdmin', require('connect-ensure-login').ensureLoggedIn(), usuario.alterarSenhaAdmin);

	app.get('/usuario/listaUsuarios', require('connect-ensure-login').ensureLoggedIn(), usuario.listaUsuarios);

	app.get('/usuario/editarUsuario/:id', require('connect-ensure-login').ensureLoggedIn(), usuario.editarUsuario);

	app.get('/usuario/imprimir/:id', require('connect-ensure-login').ensureLoggedIn(), usuario.imprimir);

	app.get('/usuario/imprimirTodos', require('connect-ensure-login').ensureLoggedIn(), usuario.imprimirTodos);

	app.get('/usuario/mensalidadeIndividual/:id', require('connect-ensure-login').ensureLoggedIn(), usuario.mensalidadeIndividual);


 	// app.post('/usuario/recuperaSenha', usuario.recuperaSenha);
 	app.post('/usuario/registrar', usuario.registrar);
 	app.post('/usuario/editarUsuarioCad/:id', usuario.editarUsuarioCad);

 	app.post('/usuario/alterarSenhaCad/:id', usuario.alterarSenhaCad); 	

 	app.post('/usuario/alterarSenhaCadAdmin/:id', usuario.alterarSenhaCadAdmin);

 	app.post('/usuario/editarMensalidade', usuario.editarMensalidade);

 	app.post('/usuario/editarMensalidadeIndividual/:id', usuario.editarMensalidadeIndividual);

 	app.post('/usuario/registrarDependente', usuario.registrarDependente);

 	app.post('/usuario/editarDependente/:id', usuario.editarDependente);

	app.get('/usuario/deletar/:id', require('connect-ensure-login').ensureLoggedIn(), usuario.deletar);

	app.get('/usuario/deletarDependente/:id', require('connect-ensure-login').ensureLoggedIn(), usuario.deletarDependente);

	app.get('/usuario/dependente/:id', require('connect-ensure-login').ensureLoggedIn(), usuario.dependente);

	app.post('/usuario/recuperaSenha', usuario.recuperaSenha);

	app.get('/recuperaSenhaIndex/:id', usuario.recuperaSenhaIndex);

	app.post('/alterarSenha-fora/:id', usuario.alterarSenhaFora);




};