/**
 * PilotoController
 *
 * @description :: Server-side logic for managing pilotoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require("moment")

module.exports = {
	new:function(req, res){
		Country.find().sort('langen').exec(function paisFounded(err, paises){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/piloto');
			}
			return res.view({ paises: paises });
		});
	},
	create:function(req, res){
		// Cria o obj
		var pilotoObj={
			nome: req.param('nome'),
			pais: req.param('pais'),
			dtnascimento: moment(req.param('dtnascimento'), 'DD/MM/YYYY').toDate()
		};

		Piloto.create(pilotoObj, function(err, piloto){
			
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/piloto/new');
			}
			
			if (!piloto){
				flashCreate.createSessionFlash(req, 'Ocorreu um erro ao gravar a piloto, informe o administrador do sistema!','erro');
				return res.redirect('/piloto');
			}

			flashCreate.createSessionFlash(req, 'Dados gravados com sucesso.','sucess');
			return res.redirect('/piloto');
			
		});
	},
	edit:function(req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/piloto');
		}

		Piloto.findOne(id,function pilotoFounded(err, piloto){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/piloto');
			}
			if(!piloto){
				flashCreate.createSessionFlash(req, 'Ops, ocorreu algum problema ao editar a piloto, favor verificar!','erro');
				return res.redirect('/piloto');
			}
			Country.find().sort('langen').exec(function paisFounded(err, paises){
				if(err){
					req.session.flash={ err: err}
					console.log(JSON.stringify(err));
					return res.redirect('/piloto');
				}
				return res.view({ piloto: piloto, paises: paises, moment: moment });
			});
		});
	},
	update:function(req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/piloto');
		}

		var nome = req.param('nome');
		var pais = req.param('pais');
		var dtnascimento = moment(req.param('dtnascimento'), 'DD/MM/YYYY').toDate()
		
		if(!nome){
			flashCreate.createSessionFlash(req, 'Ops, informação nome é necessárias','warning');
			return res.redirect('/piloto/edit/'+id);
		}

		// Cria o obj
		var pilotoObj={
			nome: nome,
			pais: pais,
			dtnascimento: dtnascimento
		};

		Piloto.update(req.param('id'),pilotoObj, function pilotoUpdated(err, piloto){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/piloto');
			}
			flashCreate.createSessionFlash(req, 'Sucesso, dados editados com sucesso.','sucess');
			return res.redirect('/piloto');
		});
	},
	index: function(req, res, next){
		Piloto.find().sort('nome').exec(function pilotoFounded(err, pilotos){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return next(err);
			}
			return res.view({ pilotos: pilotos, moment: moment });
		});
	},
	destroy: function (req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/piloto');
		}
		
		Piloto.destroy(id, function pilotoDestroy(err, piloto){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
			}
			flashCreate.createSessionFlash(req, 'Registro excluído com sucesso!','sucess');
			return res.redirect('/piloto');
		});
	}
};