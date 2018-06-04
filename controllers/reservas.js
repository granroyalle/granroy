var moment = require('moment');
var calendar = require('node-calendar');
var cal = new calendar.Calendar(calendar.SUNDAY);
var yearCalendar = cal.yeardayscalendar(2004);
var string = require('string');

module.exports = function(app) {

	var Reservas = app.models.reservas;
	var ReservasQuadra = app.models.reservasQuadra;
	var Participantes = app.models.participantes;
	var Usuario = app.models.usuario;
	var nomeDocumento = app.models.nomeDocumento;

 	var ReservasController = {
		// reservas: function(req,res) {
		// 	Reservas.find().sort( {'data': 1} ).exec(function(err, data){
		// 		if (err) {
		// 			console.log('Deu erro aqui'+err);
		// 		}
		// 		Usuario.find(function(err, data2){
		// 			if (err) {
		// 				console.log('Deu erro aqui'+err);
		// 			}
		// 			nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
		// 				if (err) {
		// 					console.log('Deu erro aqui'+err);
		// 				}
		// 				/*MESES*/
		// 				var mes = moment(new Date()).format('MM');
		// 				var ano = moment(new Date()).format('YYYY');
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-01'}).sort({'horaInicio': 1}).exec(function(err, dataReserva1){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-02'}).sort({'horaInicio': 1}).exec(function(err, dataReserva2){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-03'}).sort({'horaInicio': 1}).exec(function(err, dataReserva3){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-04'}).sort({'horaInicio': 1}).exec(function(err, dataReserva4){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-05'}).sort({'horaInicio': 1}).exec(function(err, dataReserva5){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-06'}).sort({'horaInicio': 1}).exec(function(err, dataReserva6){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-07'}).sort({'horaInicio': 1}).exec(function(err, dataReserva7){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-08'}).sort({'horaInicio': 1}).exec(function(err, dataReserva8){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-09'}).sort({'horaInicio': 1}).exec(function(err, dataReserva9){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-10'}).sort({'horaInicio': 1}).exec(function(err, dataReserva10){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-11'}).sort({'horaInicio': 1}).exec(function(err, dataReserva11){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-12'}).sort({'horaInicio': 1}).exec(function(err, dataReserva12){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-13'}).sort({'horaInicio': 1}).exec(function(err, dataReserva13){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-14'}).sort({'horaInicio': 1}).exec(function(err, dataReserva14){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-15'}).sort({'horaInicio': 1}).exec(function(err, dataReserva15){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-16'}).sort({'horaInicio': 1}).exec(function(err, dataReserva16){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-17'}).sort({'horaInicio': 1}).exec(function(err, dataReserva17){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-18'}).sort({'horaInicio': 1}).exec(function(err, dataReserva18){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-19'}).sort({'horaInicio': 1}).exec(function(err, dataReserva19){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-20'}).sort({'horaInicio': 1}).exec(function(err, dataReserva20){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-21'}).sort({'horaInicio': 1}).exec(function(err, dataReserva21){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-22'}).sort({'horaInicio': 1}).exec(function(err, dataReserva22){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-23'}).sort({'horaInicio': 1}).exec(function(err, dataReserva23){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-24'}).sort({'horaInicio': 1}).exec(function(err, dataReserva24){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-25'}).sort({'horaInicio': 1}).exec(function(err, dataReserva25){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-26'}).sort({'horaInicio': 1}).exec(function(err, dataReserva26){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-27'}).sort({'horaInicio': 1}).exec(function(err, dataReserva27){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-28'}).sort({'horaInicio': 1}).exec(function(err, dataReserva28){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-29'}).sort({'horaInicio': 1}).exec(function(err, dataReserva29){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-30'}).sort({'horaInicio': 1}).exec(function(err, dataReserva30){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				Reservas.find({'data': ''+ano+'-'+mes+'-31'}).sort({'horaInicio': 1}).exec(function(err, dataReserva31){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 					res.render("reservas/reservas", {listaReservas: data, user: req.user, moment: moment, dataAtual: new Date(), listaDocumentos: data3, dataMomentNumber: moment().date(), reserva1: dataReserva1, reserva2: dataReserva2, reserva3: dataReserva3, reserva4: dataReserva4, reserva5: dataReserva5, reserva6: dataReserva6, reserva7: dataReserva7, reserva8: dataReserva8, reserva9: dataReserva9, reserva10: dataReserva10, reserva11: dataReserva11, reserva12: dataReserva12, reserva13: dataReserva13, reserva14: dataReserva14, reserva15: dataReserva15, reserva16: dataReserva16, reserva17: dataReserva17, reserva18: dataReserva18, reserva19: dataReserva19, reserva20: dataReserva20, reserva21: dataReserva21, reserva22: dataReserva22, reserva23: dataReserva23, reserva24: dataReserva24, reserva25: dataReserva25, reserva26: dataReserva26, reserva27: dataReserva27, reserva28: dataReserva28, reserva29: dataReserva29, reserva30: dataReserva30, reserva31: dataReserva31});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 			});
		// 		});
		// 	});
		// },
		// reservasQuadra: function(req,res) {
		// 	ReservasQuadra.find().sort( {'data': 1} ).exec(function(err, data){
		// 		if (err) {
		// 			console.log('Deu erro aqui'+err);
		// 		}
		// 		Usuario.find(function(err, data2){
		// 			if (err) {
		// 				console.log('Deu erro aqui'+err);
		// 			}
		// 			nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
		// 				if (err) {
		// 					console.log('Deu erro aqui'+err);
		// 				}
		// 				/*MESES*/
		// 				var mes = moment(new Date()).format('MM');
		// 				var ano = moment(new Date()).format('YYYY');
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-01'}).sort({'horaInicio': 1}).exec(function(err, dataReserva1){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-02'}).sort({'horaInicio': 1}).exec(function(err, dataReserva2){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-03'}).sort({'horaInicio': 1}).exec(function(err, dataReserva3){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-04'}).sort({'horaInicio': 1}).exec(function(err, dataReserva4){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-05'}).sort({'horaInicio': 1}).exec(function(err, dataReserva5){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-06'}).sort({'horaInicio': 1}).exec(function(err, dataReserva6){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-07'}).sort({'horaInicio': 1}).exec(function(err, dataReserva7){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-08'}).sort({'horaInicio': 1}).exec(function(err, dataReserva8){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-09'}).sort({'horaInicio': 1}).exec(function(err, dataReserva9){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-10'}).sort({'horaInicio': 1}).exec(function(err, dataReserva10){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-11'}).sort({'horaInicio': 1}).exec(function(err, dataReserva11){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-12'}).sort({'horaInicio': 1}).exec(function(err, dataReserva12){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-13'}).sort({'horaInicio': 1}).exec(function(err, dataReserva13){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-14'}).sort({'horaInicio': 1}).exec(function(err, dataReserva14){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-15'}).sort({'horaInicio': 1}).exec(function(err, dataReserva15){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-16'}).sort({'horaInicio': 1}).exec(function(err, dataReserva16){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-17'}).sort({'horaInicio': 1}).exec(function(err, dataReserva17){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-18'}).sort({'horaInicio': 1}).exec(function(err, dataReserva18){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-19'}).sort({'horaInicio': 1}).exec(function(err, dataReserva19){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-20'}).sort({'horaInicio': 1}).exec(function(err, dataReserva20){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-21'}).sort({'horaInicio': 1}).exec(function(err, dataReserva21){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-22'}).sort({'horaInicio': 1}).exec(function(err, dataReserva22){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-23'}).sort({'horaInicio': 1}).exec(function(err, dataReserva23){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-24'}).sort({'horaInicio': 1}).exec(function(err, dataReserva24){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-25'}).sort({'horaInicio': 1}).exec(function(err, dataReserva25){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-26'}).sort({'horaInicio': 1}).exec(function(err, dataReserva26){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-27'}).sort({'horaInicio': 1}).exec(function(err, dataReserva27){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-28'}).sort({'horaInicio': 1}).exec(function(err, dataReserva28){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-29'}).sort({'horaInicio': 1}).exec(function(err, dataReserva29){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-30'}).sort({'horaInicio': 1}).exec(function(err, dataReserva30){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 				ReservasQuadra.find({'data': ''+ano+'-'+mes+'-31'}).sort({'horaInicio': 1}).exec(function(err, dataReserva31){
		// 					if (err) {
		// 						console.log('Deu erro aqui'+err);
		// 					}
		// 					res.render("reservas/reservaQuadra", {listaReservas: data, user: req.user, moment: moment, dataAtual: new Date(), listaDocumentos: data3, dataMomentNumber: moment().date(), reserva1: dataReserva1, reserva2: dataReserva2, reserva3: dataReserva3, reserva4: dataReserva4, reserva5: dataReserva5, reserva6: dataReserva6, reserva7: dataReserva7, reserva8: dataReserva8, reserva9: dataReserva9, reserva10: dataReserva10, reserva11: dataReserva11, reserva12: dataReserva12, reserva13: dataReserva13, reserva14: dataReserva14, reserva15: dataReserva15, reserva16: dataReserva16, reserva17: dataReserva17, reserva18: dataReserva18, reserva19: dataReserva19, reserva20: dataReserva20, reserva21: dataReserva21, reserva22: dataReserva22, reserva23: dataReserva23, reserva24: dataReserva24, reserva25: dataReserva25, reserva26: dataReserva26, reserva27: dataReserva27, reserva28: dataReserva28, reserva29: dataReserva29, reserva30: dataReserva30, reserva31: dataReserva31});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 				});
		// 			});
		// 		});
		// 	});
		// },
		consultaReserva: function(req,res) {
			if (req.body.modalidade == 'Salão de Festa')
			Reservas.findOne({'data': req.body.data, 'modalidade': req.body.modalidade}, function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				if (data.modalidade != "Salão de Festa") {
					res.redirect('/reservas/numeroParticipantes/'+data._id);
				} else {
					res.write('<script>alert("Impossivel reserva!"); window.location="../reservas"</script>');
				}
			});
		},
		consultaReservaQuadra: function(req,res) {
			Reservas.find({'data': req.body.data}, function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				console.log(req.body.data);
				console.log(data);
				if (data.horaInicio != req.body.horaInicio) {
					res.redirect('/reservas/numeroParticipantes/'+data._id);
				} else {
					res.write('<script>alert("Impossivel reserva!"); window.location="../reservaQuadra"</script>');
				}
			});
		},
		reservaHorarioSalao: function(req,res) {
			Reservas.find({start: req.body.start}, function(err, data4){
				if (req.body.start == "2016-09-07" || req.body.start == "2016-10-12" || req.body.start == "2016-11-02" || req.body.start == "2016-11-15" || req.body.start == "2016-12-25" || req.body.start == "2017-01-01" || req.body.start == "2017-02-28" || req.body.start == "2017-04-14" || req.body.start == "2017-04-21" || req.body.start == "2017-05-01" || req.body.start == "2017-06-15" || req.body.start == "2017-09-07" || req.body.start == "2017-10-12" || req.body.start == "2017-11-02" || req.body.start == "2017-11-15" || req.body.start == "2017-12-25" || req.body.start == "2016-10-19" || req.body.start == "2017-10-19" || req.body.start == "2016-06-08" || req.body.start == "2017-06-08") {
					res.write('<script charset="UTF-8">alert("Não é possível realizar reservas nos feriados!"); window.location="/reservas/calendar"</script>');
				}
				if (data4 != "") {
					res.write('<script charset="UTF-8">alert("Já foi realizado uma reserva para esse dia"); window.location="/reservas/calendar"</script>');
				} else {
					Reservas.find({'modalidade': 'Salao de Festa', 'start': req.body.start, 'horaInicio': req.body.horaInicio}, function(err, data2){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
						if (data2 == ""){
							var model = new Reservas(req.body);
							model.save(function(err){
								if (err) {
									console.log(err);
								}
								Reservas.findOne().sort({'_id': -1}).exec(function(err, data){
									if (err) {
										console.log('Deu erro aqui'+err);
									}
									var model = data;
									model.url = 'http://www.granroyallepousoalegre.com.br/reservas/imprimir/'+data._id;
									model.save(function(err){
										res.redirect('/reservas/numeroParticipantes/'+data._id);
									});
								});
							});
						} else {
							res.write('<script charset="UTF-8">alert("Dia não disponível!"); window.location="/reservas/calendar"</script>');
						}
					});
				}
			});
		},
		reservaHorarioQuadra: function(req,res) {
			// ReservasQuadra.find({'modalidade': 'Quadra Society', 'data': req.body.data, 'horaInicio': req.body.horaInicio}, function(err, data2){
			// 	if (err) {
			// 		console.log('Deu erro aqui'+err);
			// 	}
			// 	console.log(data2);
			// 	if (data2 == ""){
			// 		var model = new ReservasQuadra(req.body);
			// 		model.save(function(err){
			// 			if (err) {
			// 				console.log(err);
			// 			}
			// 			ReservasQuadra.findOne().sort({'_id': -1}).exec(function(err, data){
			// 				if (err) {
			// 					console.log('Deu erro aqui'+err);
			// 				}
			// 				res.redirect('/reservas/numeroParticipantesQS/'+data._id);
			// 			});
			// 		});
			// 	} else {
			// 		res.write('<script charset="UTF-8">alert("Horario escolhido não disponível!"); window.location="/reservas/reservaQuadra"</script>');
			// 	}
			// });
			var dataCorreta = req.body.start;
			var timeCorreto = req.body.horaInicio;
			var timeDateCorreto = ''+dataCorreta+'T'+timeCorreto+':00';
			ReservasQuadra.find({start: timeDateCorreto}, function(err, data4){
				console.log(data4);
				if (req.body.start == "2016-09-07" || req.body.start == "2016-10-12" || req.body.start == "2016-11-02" || req.body.start == "2016-11-15" || req.body.start == "2016-12-25" || req.body.start == "2017-01-01" || req.body.start == "2017-02-28" || req.body.start == "2017-04-14" || req.body.start == "2017-04-21" || req.body.start == "2017-05-01" || req.body.start == "2017-06-15" || req.body.start == "2017-09-07" || req.body.start == "2017-10-12" || req.body.start == "2017-11-02" || req.body.start == "2017-11-15" || req.body.start == "2017-12-25" || req.body.start == "2016-10-19" || req.body.start == "2017-10-19" || req.body.start == "2016-06-08" || req.body.start == "2017-06-08") {
					res.write('<script charset="UTF-8">alert("Não é possível realizar reservas nos feriados!"); window.location="/reservas/calendarQuadra"</script>');
				}
				if (data4 != "") {
					res.write('<script charset="UTF-8">alert("Já foi realizado uma reserva para esse dia"); window.location="/reservas/calendarQuadra"</script>');
				} else {
					ReservasQuadra.find({'modalidade': 'Quadra Society', 'start': req.body.data, 'horaInicio': req.body.horaInicio}, function(err, data2){
						if (err) {
							console.log('Deu erro aqui'+err);
						}
						if (data2 == ""){
							var dataCerta = req.body.start;
							var horaCerta = req.body.horaInicio;
							var dataHoraCerta = ''+dataCerta+'T'+horaCerta+':00';
							var dataCertaEnd = req.body.start;
							var horaCertaEnd = req.body.horaTermino;
							var dataHoraCertaEnd = ''+dataCertaEnd+'T'+horaCertaEnd+':00';
							model = new ReservasQuadra;
							model.idUser = req.body.idUser;
							model.title = req.body.title;
							model.horaInicio = req.body.horaInicio;
							model.data = req.body.start;
							model.start = dataHoraCerta;
							model.end = dataHoraCertaEnd;
							model.horaTermino = req.body.horaTermino;
							model.modalidade = req.body.modalidade;
							model.save(function(err){
								if (err) {
									console.log(err);
								}
								ReservasQuadra.findOne().sort({'_id': -1}).exec(function(err, data){
									if (err) {
										console.log('Deu erro aqui'+err);
									}
									var model = data;
									model.url = 'http://www.granroyallepousoalegre.com.br/reservas/imprimirQuadra/'+data._id;
									model.save(function(err){
										res.redirect('/reservas/numeroParticipantesQS/'+data._id);
									});
								});
							});
						} else {
							res.write('<script charset="UTF-8">alert("Horario escolhido não disponível!"); window.location="/reservas/calendarQuadra"</script>');
						}
					});
				}
			});
		},
		numeroParticipantes: function(req,res) {
			Reservas.findById(req.params.id, function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					res.render("reservas/numeroParticipantes", {user: req.user, url: req.url, string: string, modalidade: data, listaDocumentos: data3});
				});
			});
		},
		numeroParticipantesQS: function(req,res) {
			ReservasQuadra.findById(req.params.id, function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					res.render("reservas/numeroParticipantesQS", {user: req.user, url: req.url, string: string, modalidade: data, listaDocumentos: data3});
				});
			});
		},
		calendar: function(req,res) {
			nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				res.render("reservas/calendar", {user: req.user, url: req.url, string: string, listaDocumentos: data3, moment: moment, dataAtual: new Date(), dataMomentNumber: moment().date()});
			});
		},
		calendarQuadra: function(req,res) {
			nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				res.render("reservas/calendarQuadra", {user: req.user, url: req.url, string: string, listaDocumentos: data3, moment: moment, dataAtual: new Date(), dataMomentNumber: moment().date()});
			});
		},
		registrarNumeroParticipantesSF: function(req,res){
			var numeroPessoas = req.body.nomeParticipante;
			var number = numeroPessoas.length;
			for (var i = 0; i < number; i++) { //
				model = new Participantes;
				model.idUser = req.body.idUser;
				model.nomeUserP = req.body.nomeUserP;
				model.idmodalidadeReserva = req.body.idmodalidadeReserva;
				// model.numeroParticipante = req.body.numeroParticipante;
				model.nomeParticipante = req.body.nomeParticipante[i];
				model.rgParticipante = req.body.rgParticipante[i];
				model.save(function(err){
					if (err) {
						console.log(err);
						res.write('<script>alert("Falha ao realizar a reserva!"); window.location="../../reservas/calendar"</script>');
					}
				});
			};
			Usuario.find(function(err, dataUsuario){
			if (err) {
			console.log('Deu erro aqui'+err);
			}
					Reservas.findOne().sort( {'_id': -1} ).exec(function(err, dataParticipantes){
						if (err) {
							console.log('Deu erro aqui'+err);
						}
				var api_key = 'key-138b2b333f336e21a8883494a4fe82eb';
				var domain = 'granroyallepousoalegre.com.br';
				var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

				var data = {
				from: 'Gran Royalle <granroyallepousoalegre@gmail.com>',
				to: 'granroyalle@hotmail.com',
				subject: 'Nova Reserva Salão de Festa',
				text: 'Nova reserva efetuada, para mais detalhes é só seguir o link: http://www.granroyallepousoalegre.com.br/reservas/imprimir/'+dataParticipantes._id+''
				};
				mailgun.messages().send(data, function (error, body) {
				console.log(body);
				});
					});
		});
			res.write('<script>alert("Reserva realizada com sucesso! Em breve o administrador ira entrar em contato"); window.location="../../reservas/calendar";</script>');

		},
		boletoBancoReservasSF: function(req,res){
			var Boleto = require('node-boleto').Boleto;
			var boleto = new Boleto({
			  'banco': "santander", // nome do banco dentro da pasta 'banks'
			  'data_emissao': new Date(),
			  'data_vencimento': new Date(new Date().getTime() + 5 * 24 * 3600 * 1000), // 1 dia // new Date(new Date().getTime() + 5 * 24 * 3600 * 1000)
			  'valor': 10000, // R$ 15,00 (valor em centavos)
			  'nosso_numero': "1234567", //
			  'numero_documento': "123123", //
			  'cedente': "Associação Residencial Gran Royalle Pouso Alegre - CNPJ/CPF: 09653764000150", // Associação Residencial Gran Royalle Pouso Alegre - CNPJ/CPF: 09653764000150
			  'cedente_cnpj': "09653764000150", // 09653764000150
			  'agencia': "2255-1", // 2255-1
			  'codigo_cedente': "4946723", // PSK (código da carteira)  4946723
			  'carteira': "102"
			});

			boleto.renderHTML(function(html){
				return res.send(html);
			});
		},
		registrarNumeroParticipantes: function(req,res){
			var numeroPessoas = req.body.nomeParticipante;
			var number = numeroPessoas.length;
			for (var i = 0; i < number; i++) { //
				model = new Participantes;
				model.idUser = req.body.idUser;
				model.nomeUserP = req.body.nomeUserP;
				model.idmodalidadeReserva = req.body.idmodalidadeReserva;
				// model.numeroParticipante = req.body.numeroParticipante;
				model.nomeParticipante = req.body.nomeParticipante[i];
				model.rgParticipante = req.body.rgParticipante[i];
				model.save(function(err){
					if (err) {
						console.log(err);
						res.write('<script>alert("Falha ao realizar a reserva!"); window.location="../../reservas/calendarQuadra"</script>');
					}
				});
			};
			Usuario.find(function(err, dataUsuario){
        if (err) {
          console.log('Deu erro aqui'+err);
        }
				ReservasQuadra.findOne().sort( {'_id': -1} ).exec(function(err, dataParticipantes){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
	        var api_key = 'key-138b2b333f336e21a8883494a4fe82eb';
	        var domain = 'granroyallepousoalegre.com.br';
	        var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

	        var data = {
	          from: 'Gran Royalle <granroyallepousoalegre@gmail.com>',
	          to: 'granroyalle@hotmail.com',
	          subject: 'Nova Reserva Quadra',
	          text: 'Nova reserva efetuada, para mais detalhes é só seguir o link: http://www.granroyallepousoalegre.com.br/reservas/imprimirQuadra/'+dataParticipantes._id+''
	        };
	        mailgun.messages().send(data, function (error, body) {
	          console.log(body);
	        });
				});
      });
			res.write('<script>alert("Reserva realizada com sucesso! Em breve o administrador ira entrar em contato"); window.location="../../reservas/calendarQuadra"</script>');
		},
		boletoBancoReservas: function(req,res){
			var Boleto = require('node-boleto').Boleto;
			var boleto = new Boleto({
			  'banco': "santander", // nome do banco dentro da pasta 'banks'
			  'data_emissao': new Date(),
			  'data_vencimento': new Date(new Date().getTime() + 5 * 24 * 3600 * 1000), // 1 dia // new Date(new Date().getTime() + 5 * 24 * 3600 * 1000)
			  'valor': 1000, // R$ 15,00 (valor em centavos)
			  'nosso_numero': "1234567", //
			  'numero_documento': "123123", //
			  'cedente': "Associação Residencial Gran Royalle Pouso Alegre - CNPJ/CPF: 09653764000150", // Associação Residencial Gran Royalle Pouso Alegre - CNPJ/CPF: 09653764000150
			  'cedente_cnpj': "09653764000150", // 09653764000150
			  'agencia': "2255-1", // 2255-1
			  'codigo_cedente': "4946723", // PSK (código da carteira)  4946723
			  'carteira': "102"
			});

			boleto.renderHTML(function(html){
				return res.send(html);
			});
		},
		reservasFiltrada: function(req,res) {
			Reservas.find({'data': req.body.data}, function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					res.render("reservas/reservasFiltrada", {listaReservas: data, user: req.user, moment: moment, dataAtual: new Date(), listaDocumentos: data3});
				});
			});
		},

		listaReservas: function(req,res){
			Reservas.find().sort( {'start': 1} ).exec(function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				Usuario.find(function(err, data2){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
						if (err) {
							console.log('Deu erro aqui'+err);
						}
						/*MESES*/
						var mes = moment(new Date()).format('MM');
						var ano = moment(new Date()).format('YYYY');
						Reservas.find({'start': ''+ano+'-'+mes+'-01'}).sort({'horaInicio': 1}).exec(function(err, dataReserva1){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-02'}).sort({'horaInicio': 1}).exec(function(err, dataReserva2){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-03'}).sort({'horaInicio': 1}).exec(function(err, dataReserva3){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-04'}).sort({'horaInicio': 1}).exec(function(err, dataReserva4){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-05'}).sort({'horaInicio': 1}).exec(function(err, dataReserva5){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-06'}).sort({'horaInicio': 1}).exec(function(err, dataReserva6){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-07'}).sort({'horaInicio': 1}).exec(function(err, dataReserva7){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-08'}).sort({'horaInicio': 1}).exec(function(err, dataReserva8){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-09'}).sort({'horaInicio': 1}).exec(function(err, dataReserva9){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-10'}).sort({'horaInicio': 1}).exec(function(err, dataReserva10){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-11'}).sort({'horaInicio': 1}).exec(function(err, dataReserva11){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-12'}).sort({'horaInicio': 1}).exec(function(err, dataReserva12){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-13'}).sort({'horaInicio': 1}).exec(function(err, dataReserva13){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-14'}).sort({'horaInicio': 1}).exec(function(err, dataReserva14){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-15'}).sort({'horaInicio': 1}).exec(function(err, dataReserva15){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-16'}).sort({'horaInicio': 1}).exec(function(err, dataReserva16){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-17'}).sort({'horaInicio': 1}).exec(function(err, dataReserva17){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-18'}).sort({'horaInicio': 1}).exec(function(err, dataReserva18){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-19'}).sort({'horaInicio': 1}).exec(function(err, dataReserva19){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-20'}).sort({'horaInicio': 1}).exec(function(err, dataReserva20){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-21'}).sort({'horaInicio': 1}).exec(function(err, dataReserva21){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-22'}).sort({'horaInicio': 1}).exec(function(err, dataReserva22){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-23'}).sort({'horaInicio': 1}).exec(function(err, dataReserva23){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-24'}).sort({'horaInicio': 1}).exec(function(err, dataReserva24){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-25'}).sort({'horaInicio': 1}).exec(function(err, dataReserva25){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-26'}).sort({'horaInicio': 1}).exec(function(err, dataReserva26){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-27'}).sort({'horaInicio': 1}).exec(function(err, dataReserva27){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-28'}).sort({'horaInicio': 1}).exec(function(err, dataReserva28){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-29'}).sort({'horaInicio': 1}).exec(function(err, dataReserva29){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-30'}).sort({'horaInicio': 1}).exec(function(err, dataReserva30){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						Reservas.find({'start': ''+ano+'-'+mes+'-31'}).sort({'horaInicio': 1}).exec(function(err, dataReserva31){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
							res.render("reservas/listaReservas", {listaReservas: data, user: req.user, moment: moment, dataAtual: new Date(), listaDocumentos: data3, dataMomentNumber: moment().date(), reserva1: dataReserva1, reserva2: dataReserva2, reserva3: dataReserva3, reserva4: dataReserva4, reserva5: dataReserva5, reserva6: dataReserva6, reserva7: dataReserva7, reserva8: dataReserva8, reserva9: dataReserva9, reserva10: dataReserva10, reserva11: dataReserva11, reserva12: dataReserva12, reserva13: dataReserva13, reserva14: dataReserva14, reserva15: dataReserva15, reserva16: dataReserva16, reserva17: dataReserva17, reserva18: dataReserva18, reserva19: dataReserva19, reserva20: dataReserva20, reserva21: dataReserva21, reserva22: dataReserva22, reserva23: dataReserva23, reserva24: dataReserva24, reserva25: dataReserva25, reserva26: dataReserva26, reserva27: dataReserva27, reserva28: dataReserva28, reserva29: dataReserva29, reserva30: dataReserva30, reserva31: dataReserva31});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
					});
				});
			});
		},
		listaReservasQuadra: function(req,res){
			ReservasQuadra.find().sort( {'data': 1} ).exec(function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				Usuario.find(function(err, data2){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
						if (err) {
							console.log('Deu erro aqui'+err);
						}
						/*MESES*/
						var mes = moment(new Date()).format('MM');
						var ano = moment(new Date()).format('YYYY');
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-01'}).sort({'horaInicio': 1}).exec(function(err, dataReserva1){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-02'}).sort({'horaInicio': 1}).exec(function(err, dataReserva2){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-03'}).sort({'horaInicio': 1}).exec(function(err, dataReserva3){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-04'}).sort({'horaInicio': 1}).exec(function(err, dataReserva4){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-05'}).sort({'horaInicio': 1}).exec(function(err, dataReserva5){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-06'}).sort({'horaInicio': 1}).exec(function(err, dataReserva6){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-07'}).sort({'horaInicio': 1}).exec(function(err, dataReserva7){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-08'}).sort({'horaInicio': 1}).exec(function(err, dataReserva8){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-09'}).sort({'horaInicio': 1}).exec(function(err, dataReserva9){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-10'}).sort({'horaInicio': 1}).exec(function(err, dataReserva10){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-11'}).sort({'horaInicio': 1}).exec(function(err, dataReserva11){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-12'}).sort({'horaInicio': 1}).exec(function(err, dataReserva12){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-13'}).sort({'horaInicio': 1}).exec(function(err, dataReserva13){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-14'}).sort({'horaInicio': 1}).exec(function(err, dataReserva14){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-15'}).sort({'horaInicio': 1}).exec(function(err, dataReserva15){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-16'}).sort({'horaInicio': 1}).exec(function(err, dataReserva16){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-17'}).sort({'horaInicio': 1}).exec(function(err, dataReserva17){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-18'}).sort({'horaInicio': 1}).exec(function(err, dataReserva18){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-19'}).sort({'horaInicio': 1}).exec(function(err, dataReserva19){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-20'}).sort({'horaInicio': 1}).exec(function(err, dataReserva20){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-21'}).sort({'horaInicio': 1}).exec(function(err, dataReserva21){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-22'}).sort({'horaInicio': 1}).exec(function(err, dataReserva22){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-23'}).sort({'horaInicio': 1}).exec(function(err, dataReserva23){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-24'}).sort({'horaInicio': 1}).exec(function(err, dataReserva24){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-25'}).sort({'horaInicio': 1}).exec(function(err, dataReserva25){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-26'}).sort({'horaInicio': 1}).exec(function(err, dataReserva26){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-27'}).sort({'horaInicio': 1}).exec(function(err, dataReserva27){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-28'}).sort({'horaInicio': 1}).exec(function(err, dataReserva28){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-29'}).sort({'horaInicio': 1}).exec(function(err, dataReserva29){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-30'}).sort({'horaInicio': 1}).exec(function(err, dataReserva30){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
						ReservasQuadra.find({'data': ''+ano+'-'+mes+'-31'}).sort({'horaInicio': 1}).exec(function(err, dataReserva31){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
							res.render("reservas/listaReservasQuadra", {listaReservas: data, user: req.user, moment: moment, dataAtual: new Date(), listaDocumentos: data3, dataMomentNumber: moment().date(), reserva1: dataReserva1, reserva2: dataReserva2, reserva3: dataReserva3, reserva4: dataReserva4, reserva5: dataReserva5, reserva6: dataReserva6, reserva7: dataReserva7, reserva8: dataReserva8, reserva9: dataReserva9, reserva10: dataReserva10, reserva11: dataReserva11, reserva12: dataReserva12, reserva13: dataReserva13, reserva14: dataReserva14, reserva15: dataReserva15, reserva16: dataReserva16, reserva17: dataReserva17, reserva18: dataReserva18, reserva19: dataReserva19, reserva20: dataReserva20, reserva21: dataReserva21, reserva22: dataReserva22, reserva23: dataReserva23, reserva24: dataReserva24, reserva25: dataReserva25, reserva26: dataReserva26, reserva27: dataReserva27, reserva28: dataReserva28, reserva29: dataReserva29, reserva30: dataReserva30, reserva31: dataReserva31});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
						});
					});
				});
			});
		},
		imprimir: function(req,res){
			Participantes.find({'idmodalidadeReserva': req.params.id}, function(err, data){
				if (err) {
					console.log('Deu erro aqui: '+err);
				}
				Reservas.findById(req.params.id, function(err, data2){
					if (err) {
						console.log('Deu erro aqui: '+err);
					}
					nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
						if (err) {
							console.log('Deu erro aqui'+err);
						}
						res.render("reservas/imprimir", {reservas: data2, user: req.user, moment: moment, dataAtual: new Date(), listaParticipantes: data, listaDocumentos: data3});
					});
				});
			});
		},
		imprimirQuadra: function(req,res){
			Participantes.find({'idmodalidadeReserva': req.params.id}, function(err, data){
				if (err) {
					console.log('Deu erro aqui: '+err);
				}
				ReservasQuadra.findById(req.params.id, function(err, data2){
					if (err) {
						console.log('Deu erro aqui: '+err);
					}
					nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
						if (err) {
							console.log('Deu erro aqui'+err);
						}
						res.render("reservas/imprimirQuadra", {reservas: data2, user: req.user, moment: moment, dataAtual: new Date(), listaParticipantes: data, listaDocumentos: data3});
					});
				});
			});
		},
		json: function(req,res) {
			Reservas.find().sort( {'data': 1} ).exec(function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				Usuario.find(function(err, data2){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
						if (err) {
							console.log('Deu erro aqui'+err);
						}
						/*MESES*/
						// var mes = moment(new Date()).format('MM');
						// var ano = moment(new Date()).format('YYYY');
						Reservas.find(function(err, dataReserva){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
							res.json(dataReserva);
						});
					});
				});
			});
 		},
 		jsonQuadra: function(req,res) {
			ReservasQuadra.find().sort( {'data': 1} ).exec(function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				Usuario.find(function(err, data2){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
						if (err) {
							console.log('Deu erro aqui'+err);
						}
						/*MESES*/
						// var mes = moment(new Date()).format('MM');
						// var ano = moment(new Date()).format('YYYY');
						ReservasQuadra.find(function(err, dataReserva){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
							res.json(dataReserva);
						});
					});
				});
			});
 		}
 	}
 	return ReservasController;
}
