module.exports = {
	new:function(req, res){
		return res.view();
	},
	create:function(req, res){
		// Cria o obj
		var tvObj={
			nome: req.param('nome'),
			logo: req.param('logo'),
			url: req.param('url')
		};

		Tv.create(tvObj, function(err, tv){
			
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/tv/new');
			}
			
			if (!tv){
				flashCreate.createSessionFlash(req, 'Ocorreu um erro ao gravar a tv, informe o administrador do sistema!','erro');
				return res.redirect('/tv');
			}

			flashCreate.createSessionFlash(req, 'Dados gravados com sucesso.','sucess');
			return res.redirect('/tv');
			
		});
	},
	edit:function(req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/tv');
		}

		Tv.findOne(id,function tvFounded(err, tv){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/tv');
			}
			if(!tv){
				flashCreate.createSessionFlash(req, 'Ops, ocorreu algum problema ao editar a tv, favor verificar!','erro');
				return res.redirect('/tv');
			}

			return res.view({ tv: tv });
		});
	},
	update:function(req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/tv');
		}

		var nome = req.param('nome');
		
		if(!nome){
			flashCreate.createSessionFlash(req, 'Ops, informação nome é necessárias','warning');
			return res.redirect('/tv/edit/'+id);
		}

		// Cria o obj
		var tvObj={
			nome: nome,
			logo: req.param('logo'),
			url: req.param('url')
		};

		Tv.update(req.param('id'),tvObj, function tvUpdated(err, tv){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/tv');
			}
			flashCreate.createSessionFlash(req, 'Sucesso, dados editados com sucesso.','sucess');
			return res.redirect('/tv');
		});
	},
	index: function(req, res, next){
		Tv.find().sort('nome').exec(function tvFounded(err, tvs){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return next(err);
			}
			return res.view({ tvs: tvs });
		});
	},
	destroy: function (req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/tv');
		}
		
		Tv.destroy(id, function tvDestroy(err, tv){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
			}
			flashCreate.createSessionFlash(req, 'Registro excluído com sucesso!','sucess');
			return res.redirect('/tv');
		});
	}
};

