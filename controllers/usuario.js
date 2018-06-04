var string = require('string');

module.exports = function(app) {
 	
	var Usuario = app.models.usuario;
	var Dependente = app.models.dependente;
	var bCrypt = require('bcrypt-nodejs');
	var nomeDocumento = app.models.nomeDocumento;

	var createHash = function(conteudo){
		return bCrypt.hashSync(conteudo, bCrypt.genSaltSync(10), null);
	}

	// Nodejs encryption with CTR
	var crypto = require('crypto'),
	    algorithm = 'aes-256-ctr',
	    password = '\d{s8:#@i%rct|y';

	function encrypt(text){
	  var cipher = crypto.createCipher(algorithm,password)
	  var crypted = cipher.update(text,'utf8','hex')
	  crypted += cipher.final('hex');
	  return crypted;
	}
	 
	function decrypt(text){
	  var decipher = crypto.createDecipher(algorithm,password)
	  var dec = decipher.update(text,'hex','utf8')
	  dec += decipher.final('utf8');
	  return dec;
	}

 	var CadastrarUsuarioController = {

		cadastrarUsuario: function(req,res) {
			if (req.user.tipoConta == "administrador") {
				nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					res.render("usuario/cadastrarUsuario", {user: req.user, listaDocumentos: data3});
				});
			} else {
				res.render("permissaoNegada", {user: req.user});
			}
		},
		editarUsuario: function(req,res) { 	
			Usuario.findById(req.params.id, function(err, data){ 
				if (err) {
					console.log(err);
				}
				nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					res.render("usuario/editarUsuario", {valorUsuario: data, user: req.user, listaDocumentos: data3});
				});
			});
		},
		mensalidadeIndividual: function(req,res) { 	
			nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				Usuario.findById(req.params.id, function(err, data){ 
					if (err) {
						console.log(err);
					}
					res.render("usuario/mensalidadeIndividual", {valorUsuario: data, user: req.user, listaDocumentos: data3});
				});
			});
		},
		registrar: function(req,res) {
			var model = new Usuario;
			model.tipoConta = req.body.tipoConta;
			model.nome = req.body.nome;
			model.cpf = req.body.cpf;
			model.rua = req.body.rua;
			model.numeroCasa = req.body.numeroCasa;
			model.email = req.body.email;
			model.fixo = req.body.fixo;
			model.celular = req.body.celular;
			model.comercial = req.body.comercial;
			model.password = createHash(req.body.password);
			model.numeroDependente = req.body.numeroDependente;
			model.mensalidade = req.body.mensalidade;
			model.unidade = req.body.unidade;			
			model.save(function(err){
				if (err) {
					console.log(err);
					res.write('<script>alert("Falha ao registrar associado!"); window.location="cadastrarUsuario"</script>');
				}
				res.write('<script>alert("Associado registrado com sucesso!"); window.location="cadastrarUsuario"</script>');
			});
		},
		editarUsuarioCad: function(req,res){
			Usuario.findById(req.params.id, function(err, data){
				if (err) {
					console.log(err);
				}else {
					var model = data;
					model.nome = req.body.nome;
					model.cpf = req.body.cpf;
					model.rua = req.body.rua;
					model.numeroCasa = req.body.numeroCasa;
					model.email = req.body.email;
					model.fixo = req.body.fixo;
					model.celular = req.body.celular;
					model.comercial = req.body.comercial;
					model.numeroDependente = req.body.numeroDependente;
					model.mensalidade = req.body.mensalidade;
					model.unidade = req.body.unidade;
					model.save(function(err){
						if (err) {
							console.log(err);
							res.write('<script>alert("Falha ao editar associado!"); window.location="listaUsuarios"</script>');
						} else{
							res.write('<script>alert("Associado editado com sucesso!"); window.location="../listaUsuarios"</script>');
						}
					});
				}
			});
		},
		editarMensalidadeIndividual: function(req,res){
			Usuario.findById(req.params.id, function(err, data){
				if (err) {
					console.log(err);
				}else {
					var model = data;
					model.mensalidade = req.body.valor1+req.body.valor2;
					model.dataVencimento = req.body.dataVencimento;
					model.save(function(err){
						if (err) {
							console.log(err);
							res.write('<script>alert("Falha ao editar mensalidade do associado!"); window.location="../../boletos"</script>');
						} else{
							res.write('<script>alert("Mensalidade do associado editado com sucesso!"); window.location="../../boletos"</script>');
						}
					});
				}
			});
		},
		editarMensalidade: function(req,res) {
			Usuario.update({}, { mensalidade: req.body.valor1+req.body.valor2, dataVencimento: req.body.dataVencimento }, { multi: true }, function(err, callback) {
				if (err) {
					console.log(err);
					res.write('<script>alert("Falha ao editar mensalidade dos associados!"); window.location="../boletos"</script>');
				} else {
					res.write('<script>alert("Mensalidade dos associados editada com sucesso!"); window.location="../boletos"</script>');
				}
			});
		},
		listaUsuarios: function(req,res) { 	
			Usuario.find(function(err, data){ 
				if (err) {
					console.log(err);
				}
				nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					res.render("usuario/listaUsuarios", {listaUsuarios: data, user: req.user, listaDocumentos: data3});
				});
			});
		},
		deletar: function(req,res){
			Usuario.remove({_id: req.params.id}, function(err){
				if (err) {
					console.log(err);
					res.write('<script>alert("Falha ao deletar associado!"); window.location="../listaUsuarios"</script>');
				} else {
					res.write('<script>alert("Associado deletado com sucesso!"); window.location="../listaUsuarios"</script>');
				}
			});
		},
		imprimir: function(req,res) { 	
			Usuario.findById(req.params.id, function(err, data){ 
				if (err) {
					console.log(err);
				}
				Dependente.find({idPai: req.params.id}, function(err, data2){
					if (err) {
						console.log(err);
					}
					res.render("usuario/imprimir", {valorUsuario: data, user: req.user, string: string, listaDependente: data2});
				});
			});
		},
		imprimirTodos: function(req,res) { 	
			Usuario.find(function(err, data){ 
				if (err) {
					console.log(err);
				}	
				Dependente.find({idPai: data._id}, function(err, data2){
					if (err) {
						console.log(err);
					}				
					res.render("usuario/imprimirTodos", {listaUsuarios: data, user: req.user, string: string, listaDependente: data2});
				});
			});
		},
		alterarSenha: function(req,res) {
			Usuario.findById(req.params.id, function(err, data){ 
				if (err) {
					console.log(err);
				}
				nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					res.render("usuario/alterarSenha", {user: req.user, listaUsuarios: data, listaDocumentos: data3});
				});
			});
		},
		alterarSenhaAdmin: function(req,res) {
			Usuario.findById(req.params.id, function(err, data){ 
				if (err) {
					console.log(err);
				}
				nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					res.render("usuario/alterarSenhaAdmin", {user: req.user, listaUsuarios: data, listaDocumentos: data3});
				});
			});
		},
		alterarSenhaCad: function(req,res){
			Usuario.findById(req.user.id, function(err, data){
				if (err) {
					console.log(err);
				}else {
					var model = data;
					model.password = createHash(req.body.password);
					model.save(function(err){
						if (err) {
							console.log(err);
							res.write('<script>alert("Falha ao tentar alterar senha!"); window.location="../../"</script>');
						} else{
							res.write('<script>alert("Sua senha foi alterada com sucesso!"); window.location="../../"</script>');
						}
					});
				}
			});
		},
		alterarSenhaCadAdmin: function(req,res){
			Usuario.findById(req.params.id, function(err, data){
				if (err) {
					console.log(err);
				}else {
					var model = data;
					model.password = createHash(req.body.password);
					model.save(function(err){
						if (err) {
							console.log(err);
							res.write('<script>alert("Falha ao alterar senha do associado!"); window.location="../listaUsuarios"</script>');
						} else{
							res.write('<script>alert("Senha do associado foi alterada com sucesso!"); window.location="../listaUsuarios"</script>');
						}
					});
				}
			});
		},
		dependente: function(req,res) {
			if (req.user.tipoConta == "administrador") {
				Usuario.findById(req.params.id, function(err, data){ 
					if (err) {
						console.log(err);
					}
					Dependente.find({idPai: req.params.id}, function(err, data2){
						if (err) {
							console.log(err);
						}
						nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data3){
							if (err) {
								console.log('Deu erro aqui'+err);
							}
							res.render("usuario/dependente", {user: req.user, verUsuario: data, listaDocumentos: data3, listaDependente: data2});
						});
					});
				});
			} else {
				res.render("permissaoNegada", {user: req.user});
			}
		},
		registrarDependente: function(req,res) {
			var number = req.body.numeroDependente;
			if (number == "" || number == 1) {
				var model = new Dependente;
				model.idPai = req.body.idPai;
				model.nomeDependente = req.body.nomeDependente;
				model.telefoneDependente = req.body.telefoneDependente;
				model.vinculoDependente = req.body.vinculoDependente;			
				model.save(function(err){
					if (err) {
						console.log(err);
						res.write('<script>alert("Falha ao adicionar dependentes!"); window.location="listaUsuarios"</script>');
					}
					res.write('<script>alert("Dependente adicionado com sucesso!"); window.location="listaUsuarios"</script>');
				});
			} else {
				for (var i = 0; i < number; i++) {
					var model = new Dependente;
					model.idPai = req.body.idPai;
					model.nomeDependente = req.body.nomeDependente[i];
					model.telefoneDependente = req.body.telefoneDependente[i];
					model.vinculoDependente = req.body.vinculoDependente[i];			
					model.save(function(err){
						if (err) {
							console.log(err);
							res.write('<script>alert("Falha ao adicionar dependentes!"); window.location="listaUsuarios"</script>');
						}
						res.write('<script>alert("Dependentes adicionados com sucesso!"); window.location="listaUsuarios"</script>');
					});
				};
			}
		},
		deletarDependente: function(req,res){
			Dependente.remove({_id: req.params.id}, function(err){
				if (err) {
					console.log(err);
					res.write('<script>alert("Falha ao deletar dependente do associado!"); window.location="../listaUsuarios"</script>');
				} else {
					res.write('<script>alert("Dependente associado deletado com sucesso!"); window.location="../listaUsuarios"</script>');
				}
			});
		},
		editarDependente: function(req,res){
			Dependente.findById(req.params.id, function(err, data){
				if (err) {
					console.log(err);
				}else {
					var model = data;
					model.nomeDependente = req.body.nomeDependente;
					model.telefoneDependente = req.body.telefoneDependente;
					model.vinculoDependente = req.body.vinculoDependente;
					model.save(function(err){
						if (err) {
							console.log(err);
							res.write('<script>alert("Falha ao editar associado!"); window.location="../listaUsuarios"</script>');
						} else{
							res.write('<script>alert("Associado editado com sucesso!"); window.location="../listaUsuarios"</script>');
						}
					});
				}
			});
		},
		recuperaSenha: function(req,res){
			console.log(req.body.email);
			var emailUsuario = encrypt(req.body.email);
			var emailUsuarioEnvia = req.body.email;
			var api_key = 'key-138b2b333f336e21a8883494a4fe82eb';
			var domain = 'granroyallepousoalegre.com.br';
			var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
			 
			var data = {
			  from: 'Gran Roaylle <granroyallepousoalegre@gmail.com>',
			  to: emailUsuarioEnvia,
			  subject: 'Alterar Senha',
			  text: 'Solicitou alteração de senha? Segue o link para realizar: http://www.granroyallepousoalegre.com.br/recuperaSenhaIndex/'+emailUsuario+''
			};
			
			mailgun.messages().send(data, function (error, body) {
			  console.log(body);
			});
			res.write('<script>alert("Enviamos um e-mail para alterar a sua senha!"); window.location="../login"</script>');
		},
		recuperaSenhaIndex: function(req,res){
			var emailUsuario = decrypt(req.params.id);
			Usuario.findOne({'email': emailUsuario}, function(err, data){
				if (err) {
					console.log('Deu erro aqui'+err);
				}
				nomeDocumento.find().sort( {'_id': -1} ).exec(function(err, data2){
					if (err) {
						console.log('Deu erro aqui'+err);
					}
					res.render("usuario/alterar-senha", {usuario: data, listaDocumentos: data2, userCod: data._id});
				});
			});
		},
		alterarSenhaFora: function(req,res){
			Usuario.findById(req.params.id, function(err, data){
				if (err) {
					console.log(err);
				}else {
					var model = data;
					model.password = createHash(req.body.password);
					model.save(function(err){
						if (err) {
							console.log(err);
							res.write('<script>alert("Falha ao tentar alterar senha!"); window.location="../../"</script>');
						} else{
							res.write('<script>alert("Sua senha foi alterada com sucesso!"); window.location="../../"</script>');
						}
					});
				}
			});
		}
 	}
 	return CadastrarUsuarioController;
}