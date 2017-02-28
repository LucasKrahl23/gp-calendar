/**
 * EtapaController
 *
 * @description :: Server-side logic for managing etapas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require("moment")

module.exports = {
	new:function(req, res){
		Circuito.find().sort('nome').exec(function circuitoFounded(err, circuitos){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return next(err);
			}
			Categoria.find().sort('nome').exec(function categoriaFounded(err, categorias){
				if(err){
					req.session.flash={ err: err}
					console.log(JSON.stringify(err));
					return next(err);
				}
				return res.view({ circuitos: circuitos, categorias: categorias });
			});
		});
	},
	create:function(req, res){
		// Cria o obj
		var etapaObj={
			descricao: req.param('descricao'),
			dtinicio: moment(req.param('dtinicio'), 'DD/MM/YYYY').toDate(),
			dtfim: moment(req.param('dtfim'), 'DD/MM/YYYY').toDate(),
			circuito: req.param('circuito'),
			categorias: req.param('categorias')
		};

		Etapa.create(etapaObj, function(err, etapa){
			
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/etapa/new');
			}
			
			if (!etapa){
				flashCreate.createSessionFlash(req, 'Ocorreu um erro ao gravar a etapa, informe o administrador do sistema!','erro');
				return res.redirect('/etapa');
			}

			flashCreate.createSessionFlash(req, 'Dados gravados com sucesso.','sucess');
			return res.redirect('/etapa');
			
		});
	},
	edit:function(req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/etapa');
		}

		Etapa.findOne(id).populateAll().exec(function etapaFounded(err, etapa){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/etapa');
			}
			if(!etapa){
				flashCreate.createSessionFlash(req, 'Ops, ocorreu algum problema ao editar a etapa, favor verificar!','erro');
				return res.redirect('/etapa');
			}

			Circuito.find().sort('nome').exec(function circuitoFounded(err, circuitos){
				if(err){
					req.session.flash={ err: err}
					console.log(JSON.stringify(err));
					return next(err);
				}
				Categoria.find().sort('nome').exec(function categoriaFounded(err, categorias){
					if(err){
						req.session.flash={ err: err}
						console.log(JSON.stringify(err));
						return next(err);
					}
					return res.view({ etapa: etapa, circuitos: circuitos, moment: moment, categorias: categorias });
				});
			});
		});
	},
	update:function(req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/etapa');
		}
		
		// Cria o obj
		var etapaObj={
			descricao: req.param('descricao'),
			dtinicio: moment(req.param('dtinicio'), 'DD/MM/YYYY').toDate(),
			dtfim: moment(req.param('dtfim'), 'DD/MM/YYYY').toDate(),
			circuito: req.param('circuito'),
			categorias: req.param('categorias')
		};

		Etapa.update(id,etapaObj, function etapaUpdated(err, etapa){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/etapa');
			}
			flashCreate.createSessionFlash(req, 'Sucesso, dados editados com sucesso.','sucess');
			return res.redirect('/etapa');
		});
	},
	index: function(req, res, next){
		Etapa.find().sort('dtinicio').populateAll().exec(function etapaFounded(err, etapas){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return next(err);
			}
			return res.view({
				etapas: etapas, moment: moment
			});
		});
	},
	destroy: function (req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/etapa');
		}
		
		Etapa.destroy(id, function etapaDestroy(err, etapa){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
			}
			flashCreate.createSessionFlash(req, 'Registro excluído com sucesso!','sucess');
			return res.redirect('/etapa');
		});
	}
};
