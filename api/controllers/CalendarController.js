/**
 * CalendarController
 *
 * @description :: Server-side logic for managing calendars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require("moment")

module.exports = {
	new:function(req, res){
		Categoria.find().sort('nome').exec(function categoriaFounded(errCategoria, categorias){
			if(errCategoria){
				req.session.flash={ err: errCategoria}
				console.log(JSON.stringify(errCategoria));
				return next(errCategoria);
			}

			Circuito.find().sort('nome').exec(function circuitoFounded(err, circuitos){
				if(err){
					req.session.flash={ err: err}
					console.log(JSON.stringify(err));
					return next(err);
				}
				return res.view({ categorias: categorias, circuitos: circuitos });
			});
		});
	},
	create:function(req, res){
		// Cria o obj
		var calendarObj={
			descricao: req.param('descricao'),
			dtinicio: moment(req.param('dtinicio'), 'DD/MM/YYYY').toDate(),
			dtfim: moment(req.param('dtfim'), 'DD/MM/YYYY').toDate(),
			categoria: req.param('categoria'),
			circuito: req.param('circuito')
		};

		Calendar.create(calendarObj, function(err, calendar){
			
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/calendar/new');
			}
			
			if (!calendar){
				flashCreate.createSessionFlash(req, 'Ocorreu um erro ao gravar a calendar, informe o administrador do sistema!','erro');
				return res.redirect('/calendar');
			}

			flashCreate.createSessionFlash(req, 'Dados gravados com sucesso.','sucess');
			return res.redirect('/calendar');
			
		});
	},
	edit:function(req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/calendar');
		}

		Calendar.findOne(id,function calendarFounded(err, calendar){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/calendar');
			}
			if(!calendar){
				flashCreate.createSessionFlash(req, 'Ops, ocorreu algum problema ao editar a calendar, favor verificar!','erro');
				return res.redirect('/calendar');
			}

			Categoria.find().sort('nome').exec(function categoriaFounded(errCategoria, categorias){
				if(errCategoria){
					req.session.flash={ err: errCategoria}
					console.log(JSON.stringify(errCategoria));
					return next(errCategoria);
				}

				Circuito.find().sort('nome').exec(function circuitoFounded(err, circuitos){
					if(err){
						req.session.flash={ err: err}
						console.log(JSON.stringify(err));
						return next(err);
					}
					return res.view({ calendar: calendar, categorias: categorias, circuitos: circuitos, moment: moment });
				});
			});
		});
	},
	update:function(req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/calendar');
		}
		
		// Cria o obj
		var calendarObj={
			descricao: req.param('descricao'),
			dtinicio: moment(req.param('dtinicio'), 'DD/MM/YYYY').toDate(),
			dtfim: moment(req.param('dtfim'), 'DD/MM/YYYY').toDate(),
			categoria: req.param('categoria'),
			circuito: req.param('circuito')
		};

		Calendar.update(id,calendarObj, function calendarUpdated(err, calendar){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return res.redirect('/calendar');
			}
			flashCreate.createSessionFlash(req, 'Sucesso, dados editados com sucesso.','sucess');
			return res.redirect('/calendar');
		});
	},
	index: function(req, res, next){
		Calendar.find().sort('dtinicio').populateAll().exec(function calendarFounded(err, calendars){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
				return next(err);
			}
			return res.view({
				calendars: calendars, moment: moment
			});
		});
	},
	destroy: function (req, res, next){
		var id = req.param('id');
		
		if(!id){
			flashCreate.createSessionFlash(req, 'Ops, informação id necessárias','warning');
			return res.redirect('/calendar');
		}
		
		Calendar.destroy(id, function calendarDestroy(err, calendar){
			if(err){
				req.session.flash={ err: err}
				console.log(JSON.stringify(err));
			}
			flashCreate.createSessionFlash(req, 'Registro excluído com sucesso!','sucess');
			return res.redirect('/calendar');
		});
	}
};

