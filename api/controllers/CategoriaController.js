/**
 * CategoriaController
 *
 * @description :: Server-side logic for managing categorias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new:function(req, res){
		return res.view();
	},
	create:function(req, res){
		// Cria o obj
		var categoriaObj={
			nome: req.param('nome')
		};

		Categoria.create(categoriaObj, function(err, categoria){
			
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/categoria/new');
			}
			
			if (!categoria){
				flashCreate.createSessionFlash(req, 'Ocorreu um erro ao gravar a categoria, informe o administrador do sistema!','erro');
				return res.redirect('/categoria');
			}

			flashCreate.createSessionFlash(req, 'Dados gravados com sucesso.','sucess');
			return res.redirect('/categoria');
			
		});
	},
	edit:function(req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/categoria');
		}

		Categoria.findOne(id,function categoriaFounded(err, categoria){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/categoria');
			}
			if(!categoria){
				flashCreate.createSessionFlash(req, 'Ops, ocorreu algum problema ao editar a categoria, favor verificar!','erro');
				return res.redirect('/categoria');
			}

			return res.view({ categoria: categoria });
		});
	},
	update:function(req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/categoria');
		}

		var nome = req.param('nome');
		
		if(!nome){
			flashCreate.createSessionFlash(req, 'Ops, informação nome é necessárias','warning');
			return res.redirect('/categoria/edit/'+id);
		}

		// Cria o obj
		var categoriaObj={
			nome: nome
		};

		Categoria.update(req.param('id'),categoriaObj, function categoriaUpdated(err, categoria){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/categoria');
			}
			flashCreate.createSessionFlash(req, 'Sucesso, dados editados com sucesso.','sucess');
			return res.redirect('/categoria');
		});
	},
	index: function(req, res, next){
		Categoria.find().sort('nome').exec(function categoriaFounded(err, categorias){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return next(err);
			}
			return res.view({ categorias: categorias });
		});
	},
	destroy: function (req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/categoria');
		}
		
		Categoria.destroy(id, function categoriaDestroy(err, categoria){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
			}
			flashCreate.createSessionFlash(req, 'Registro excluído com sucesso!','sucess');
			return res.redirect('/categoria');
		});
	}
};

