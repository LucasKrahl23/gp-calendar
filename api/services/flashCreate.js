
module.exports = {

	createSessionFlash: function (req, parametro_msg, parametro_tipomsg) {

		var parametros=[{
			msg: parametro_msg,
			tipomsg: parametro_tipomsg
		}]
	
		req.session.flash={ err: parametros }
	}

};