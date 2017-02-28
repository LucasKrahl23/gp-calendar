/**
 * TemporadaController
 *
 * @description :: Server-side logic for managing temporadas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new:function(req, res){
		Categoria.find().sort('nome').exec(function categoriaFounded(err, categorias){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return next(err);
			}

			Etapa.find().sort('dtinicio').populateAll().exec(function etapaFounded(err, etapas){
				if(err){
					req.session.flash={ err: err}
					console.log(JSON.stringify(err));
					return next(err);
				}
				return res.view({ categorias: categorias, etapas: etapas });
			});
		});
	},
	create:function(req, res){
		// Cria o obj
		var temporadaObj={
			nome: req.param('nome'),
			categoria: req.param('categoria'),
			etapas: req.param('etapas')
		};

		Temporada.create(temporadaObj, function(err, temporada){
			
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/temporada/new');
			}
			
			if (!temporada){
				flashCreate.createSessionFlash(req, 'Ocorreu um erro ao gravar a temporada, informe o administrador do sistema!','erro');
				return res.redirect('/temporada');
			}

			flashCreate.createSessionFlash(req, 'Dados gravados com sucesso.','sucess');
			return res.redirect('/temporada');
			
		});
	},
	edit:function(req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/temporada');
		}

		Temporada.findOne(id).populateAll().exec(function temporadaFounded(err, temporada){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/temporada');
			}
			if(!temporada){
				flashCreate.createSessionFlash(req, 'Ops, ocorreu algum problema ao editar a temporada, favor verificar!','erro');
				return res.redirect('/temporada');
			}
			Categoria.find().sort('nome').exec(function categoriaFounded(err, categorias){
				if(err){
					req.session.flash={ err: err}
					console.log(JSON.stringify(err));
					return next(err);
				}

				Etapa.find().sort('dtinicio').populateAll().exec(function etapaFounded(err, etapas){
					if(err){
						req.session.flash={ err: err}
						console.log(JSON.stringify(err));
						return next(err);
					}
					return res.view({ temporada: temporada, categorias: categorias, etapas: etapas });
				});
			});
		});
	},
	update:function(req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/temporada');
		}

		var nome = req.param('nome');
		
		if(!nome){
			flashCreate.createSessionFlash(req, 'Ops, informação nome é necessárias','warning');
			return res.redirect('/temporada/edit/'+id);
		}

		// Cria o obj
		var temporadaObj={
			nome: nome,
			categoria: req.param('categoria'),
			etapas: req.param('etapas')
		};

		Temporada.update(id,temporadaObj, function temporadaUpdated(err, temporada){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/temporada');
			}
			flashCreate.createSessionFlash(req, 'Sucesso, dados editados com sucesso.','sucess');
			return res.redirect('/temporada');
		});
	},
	index: function(req, res, next){
		Temporada.find().sort('nome').exec(function temporadaFounded(err, temporadas){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return next(err);
			}
			return res.view({ temporadas: temporadas });
		});
	},
	destroy: function (req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/temporada');
		}
		
		Temporada.destroy(id, function temporadaDestroy(err, temporada){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
			}
			flashCreate.createSessionFlash(req, 'Registro excluído com sucesso!','sucess');
			return res.redirect('/temporada');
		});
	}
};

