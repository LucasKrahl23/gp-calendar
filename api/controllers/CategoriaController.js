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
		return res.view();
	},
	update:function(req, res, next){
		return res.view();
	},
	index: function(req, res, next){
		Categoria.find().sort('id').exec(function categoriaFounded(err, categorias){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return next(err);
			}
			return res.view({ categorias: categorias });
		});
	},
	destroy: function (req, res, next){
		return res.view();
	}
};

