var moment = require('moment');
var string = require('string');

module.exports = function(app) {

	var Boleto = app.models.boleto;
	var Usuario = app.models.usuario;
	var Imprimir = app.models.imprimir;
	var nomeDocumento = app.models.nomeDocumento;

 	var BoletosController = {
		boletos: function(req,res) {
			Usuario.find(function(err, data){
				if (err) {
					console.log(err);
				}
				Boleto.find().sort( {'_id': -1} ).exec(function(err, data2){
					if (err) {
						console.log(err);
					}
					Imprimir.find(function(err, data3){
						if (err) {
							console.log(err);
						}
						nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
							res.render("boletos", {listaUsuarios: data, user: req.user, boleto: data2, impresso: data3, moment: moment, dataAtual: new Date(), listaDocumentos: data3});
						});
					});
				});
			});
		},
		boletoBanco: function(req,res){
			var Boleto = require('node-boleto').Boleto;
			var boleto = new Boleto({
			  'banco': "santander", // nome do banco dentro da pasta 'banks'
			  'data_emissao': new Date(),
			  'data_vencimento': new Date(new Date().getTime() + 5 * 24 * 3600 * 1000), // 1 dia // new Date(new Date().getTime() + 5 * 24 * 3600 * 1000)
			  'valor': req.user.mensalidade, // R$ 15,00 (valor em centavos)
			  'nosso_numero': "1234567", //
			  'numero_documento': "123123", //
			  'cedente': "Associação Residencial Gran Royalle Pouso Alegre - CNPJ/CPF: 09653764000150",
			  'cedente_cnpj': "09653764000150", // 09653764000150
			  'agencia': "2255-1", // 2255-1
			  'codigo_cedente': "4946723", // PSK (código da carteira)  4946723
			  'carteira': "102"
			});

			boleto.renderHTML(function(html){
				return res.send(html);
			});
		},
		geradorBoleto: function(req,res){
			for (var i = 0; i < req.body.condomino.length; i++) { //
				model = new Boleto;
				model.dataAtual = new Date();
				model.condomino = req.body.condomino[i];
				model.mensalidade = req.body.mensalidade[i];
				model.vencimento = req.body.vencimento[i];
				model.save(function(err){
					if (err) {
						console.log(err);
						res.write('<script>alert("Falha ao gerar Boleto!"); window.location="../boletos"</script>');
					}
				});
			};
			var api_key = 'key-138b2b333f336e21a8883494a4fe82eb';
			var domain = 'granroyallepousoalegre.com.br';
			var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

			for (var i = 0; i < req.body.emails.length; i++) {
				var data = {
					from: 'Gran Royalle <granroyallepousoalegre@gmail.com>',
					to: req.body.emails[i],
					subject: 'Novo Boleto Gerado',
					text: 'Novo boleto foi gerado, favor verificar: http://www.granroyallepousoalegre.com.br/boletos/'
				};
			}

			mailgun.messages().send(data, function (error, body) {
				console.log(body);
			});
			res.write('<script>alert("Boleto gerado com sucesso!"); window.location="../boletos"</script>');
		},
		usuarioImprimiu: function(req,res){
			Usuario.findById(req.params.id, function(err, data){
				if (err) {
					console.log(err);
				} else {
					var model = data;
					model.dataMesAtual = new Date();
					model.impresso = req.body.impresso;
					model.save(function(err){
						if (err) {
							console.log(err);
						}
					});
					res.redirect('/boletoBanco');
				}
			});
		}
 	}
 	return BoletosController;
}
