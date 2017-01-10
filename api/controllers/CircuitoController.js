/**
 * CircuitoController
 *
 * @description :: Server-side logic for managing circuitoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new:function(req, res){
		return res.view();
	},
	create:function(req, res){
		return res.view();	
	},
	edit:function(req, res, next){
		return res.view();
	},
	update:function(req, res, next){
		return res.view();
	},
	index: function(req, res, next){
		return res.view();	
	},
	destroy: function (req, res, next){
		return res.view();
	}
};

