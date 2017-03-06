var moment = require("moment")

module.exports = {
	new:function(req, res){
		Tv.find().sort('nome').exec(function tvFounded(err, tvs){
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
				return res.view({
					tvs: tvs, etapas: etapas, moment: moment
				});
			});
		});
	},
	create:function(req, res){
		// Cria o obj
		var programacaoObj={
			nome: req.param('nome'),
			data: moment(req.param('data'), 'DD/MM/YYYY').toDate(),
			hora: req.param('hora'),
			tv:  req.param('tv'),
			etapa:  req.param('etapa')
		};

		Programacao.create(programacaoObj, function(err, programacao){
			
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/programacao/new');
			}
			
			if (!programacao){
				flashCreate.createSessionFlash(req, 'Ocorreu um erro ao gravar a programacao, informe o administrador do sistema!','erro');
				return res.redirect('/programacao');
			}

			flashCreate.createSessionFlash(req, 'Dados gravados com sucesso.','sucess');
			return res.redirect('/programacao');
			
		});
	},
	edit:function(req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/programacao');
		}

		Programacao.findOne(id,function programacaoFounded(err, programacao){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/programacao');
			}
			if(!programacao){
				flashCreate.createSessionFlash(req, 'Ops, ocorreu algum problema ao editar a programacao, favor verificar!','erro');
				return res.redirect('/programacao');
			}

			Tv.find().sort('nome').exec(function tvFounded(err, tvs){
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
					return res.view({
						programacao: programacao, moment: moment, tvs: tvs, etapas: etapas
					});
				});
			});
		});
	},
	update:function(req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/programacao');
		}

		var nome = req.param('nome');
		
		if(!nome){
			flashCreate.createSessionFlash(req, 'Ops, informação nome é necessárias','warning');
			return res.redirect('/programacao/edit/'+id);
		}

		// Cria o obj
		var programacaoObj={
			nome: nome,
			data: moment(req.param('data'), 'DD/MM/YYYY').toDate(),
			hora: req.param('hora'),
			tv:  req.param('tv'),
			etapa:  req.param('etapa')
		};

		Programacao.update(req.param('id'),programacaoObj, function programacaoUpdated(err, programacao){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/programacao');
			}
			flashCreate.createSessionFlash(req, 'Sucesso, dados editados com sucesso.','sucess');
			return res.redirect('/programacao');
		});
	},
	index: function(req, res, next){
		Programacao.find().sort('nome').populateAll().exec(function programacaoFounded(err, programacaos){
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
				return res.view({ programacaos: programacaos, moment: moment, etapas: etapas });
			});
		});
	},
	destroy: function (req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/programacao');
		}
		
		Programacao.destroy(id, function programacaoDestroy(err, programacao){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
			}
			flashCreate.createSessionFlash(req, 'Registro excluído com sucesso!','sucess');
			return res.redirect('/programacao');
		});
	}
};

