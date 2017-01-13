/**
 * CircuitoController
 *
 * @description :: Server-side logic for managing circuitoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new:function(req, res){
		Country.find().sort('langen').exec(function paisFounded(err, paises){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/circuito');
			}
			return res.view({ paises: paises });
		});
	},
	create:function(req, res){
		// Cria o obj
		var circuitoObj={
			nome: req.param('nome'),
			pais: req.param('pais'),
			link_localizacao: req.param('link_localizacao')
		};

		Circuito.create(circuitoObj, function(err, circuito){
			
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/circuito/new');
			}
			
			if (!circuito){
				flashCreate.createSessionFlash(req, 'Ocorreu um erro ao gravar a circuito, informe o administrador do sistema!','erro');
				return res.redirect('/circuito');
			}

			flashCreate.createSessionFlash(req, 'Dados gravados com sucesso.','sucess');
			return res.redirect('/circuito');
			
		});
	},
	edit:function(req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/circuito');
		}

		Circuito.findOne(id,function circuitoFounded(err, circuito){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/circuito');
			}
			if(!circuito){
				flashCreate.createSessionFlash(req, 'Ops, ocorreu algum problema ao editar a circuito, favor verificar!','erro');
				return res.redirect('/circuito');
			}
			Country.find().sort('langen').exec(function paisFounded(err, paises){
				if(err){
					req.session.flash={ err: err}
					console.log(JSON.stringify(err));
					return res.redirect('/circuito');
				}
				return res.view({ circuito: circuito, paises: paises });
			});
		});
	},
	update:function(req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/circuito');
		}

		var nome = req.param('nome');
		var pais = req.param('pais');
		var link_localizacao = req.param('link_localizacao');
		
		if(!nome){
			flashCreate.createSessionFlash(req, 'Ops, informação nome é necessárias','warning');
			return res.redirect('/circuito/edit/'+id);
		}

		// Cria o obj
		var circuitoObj={
			nome: nome,
			pais: pais,
			link_localizacao: link_localizacao
		};

		Circuito.update(req.param('id'),circuitoObj, function circuitoUpdated(err, circuito){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/circuito');
			}
			flashCreate.createSessionFlash(req, 'Sucesso, dados editados com sucesso.','sucess');
			return res.redirect('/circuito');
		});
	},
	index: function(req, res, next){
		Circuito.find().sort('nome').exec(function circuitoFounded(err, circuitos){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return next(err);
			}
			return res.view({ circuitos: circuitos });
		});
	},
	destroy: function (req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/circuito');
		}
		
		Circuito.destroy(id, function circuitoDestroy(err, circuito){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
			}
			flashCreate.createSessionFlash(req, 'Registro excluído com sucesso!','sucess');
			return res.redirect('/circuito');
		});
	}
};

