module.exports = function(app){
	
	var reservas = app.controllers.reservas; // pega da pasta controllers, o controllers esta setado em load

 	// app.get('/reservas', require('connect-ensure-login').ensureLoggedIn(), reservas.reservas);

 	app.get('/reservas/calendar', require('connect-ensure-login').ensureLoggedIn(), reservas.calendar);

 	app.get('/reservas/calendarQuadra', require('connect-ensure-login').ensureLoggedIn(), reservas.calendarQuadra);

 	// app.get('/reservas/reservaQuadra', require('connect-ensure-login').ensureLoggedIn(), reservas.reservasQuadra);

 	app.post('/reservas/reservaHorarioSalao', reservas.reservaHorarioSalao);

 	app.post('/reservas/reservaHorarioQuadra', reservas.reservaHorarioQuadra);

 	app.post('/reservas/consultaReserva', reservas.consultaReserva);

 	app.post('/reservas/consultaReservaQuadra', reservas.consultaReservaQuadra);

 	app.get('/reservas/numeroParticipantes/:id', require('connect-ensure-login').ensureLoggedIn(), reservas.numeroParticipantes);

 	app.get('/reservas/numeroParticipantesQS/:id', require('connect-ensure-login').ensureLoggedIn(), reservas.numeroParticipantesQS);

 	app.post('/reservas/registrarNumeroParticipantes/:id', reservas.registrarNumeroParticipantes);

 	app.post('/reservas/registrarNumeroParticipantesSF/:id', reservas.registrarNumeroParticipantesSF);

 	app.post('/reservas/reservasFiltrada', require('connect-ensure-login').ensureLoggedIn(), reservas.reservasFiltrada);

 	app.get('/reservas/listaReservas', require('connect-ensure-login').ensureLoggedIn(), reservas.listaReservas);

 	app.get('/reservas/listaReservasQuadra', require('connect-ensure-login').ensureLoggedIn(), reservas.listaReservasQuadra);

 	app.get('/reservas/imprimir/:id', require('connect-ensure-login').ensureLoggedIn(), reservas.imprimir);

 	app.get('/reservas/imprimirQuadra/:id', require('connect-ensure-login').ensureLoggedIn(), reservas.imprimirQuadra);

 	app.get('/boletoBancoReservas', require('connect-ensure-login').ensureLoggedIn(), reservas.boletoBancoReservas);

 	app.get('/boletoBancoReservasSF', require('connect-ensure-login').ensureLoggedIn(), reservas.boletoBancoReservasSF);

 	app.get('/reservas/json', reservas.json);
 	
 	app.get('/reservas/jsonQuadra', reservas.jsonQuadra);



 // 	mandrill_client = new mandrill.Mandrill('YOUR_API_KEY');
	// var name = "Example Template";
	// var from_email = "from_email@example.com";
	// var from_name = "Example Name";
	// var subject = "example subject";
	// var code = "<div>example code</div>";
	// var text = "Example text content";
	// var publish = false;
	// var labels = [
	//     "example-label"
	// ];
	// mandrill_client.templates.add({"name": name, "from_email": from_email, "from_name": from_name, "subject": subject, "code": code, "text": text, "publish": publish, "labels": labels}, function(result) {
	//     console.log(result);
	//      //
	//     {
	//         "slug": "example-template",
	//         "name": "Example Template",
	//         "labels": [
	//             "example-label"
	//         ],
	//         "code": "<div mc:edit=\"editable\">editable content</div>",
	//         "subject": "example subject",
	//         "from_email": "from.email@example.com",
	//         "from_name": "Example Name",
	//         "text": "Example text",
	//         "publish_name": "Example Template",
	//         "publish_code": "<div mc:edit=\"editable\">different than draft content</div>",
	//         "publish_subject": "example publish_subject",
	//         "publish_from_email": "from.email.published@example.com",
	//         "publish_from_name": "Example Published Name",
	//         "publish_text": "Example published text",
	//         "published_at": "2013-01-01 15:30:40",
	//         "created_at": "2013-01-01 15:30:27",
	//         "updated_at": "2013-01-01 15:30:49"
	//     }
	//      //
	// }, function(e) {
	//     // Mandrill returns the error as an object with name and message keys
	//     console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	//     // A mandrill error occurred: Invalid_Key - Invalid API key
	// });

};