/**
 * Etapa.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	descricao: {
  		type: 'string',
  		required: true
  	},
  	dtinicio: {
  		type: 'date',
  		required: true
  	},
  	dtfim: {
  		type: 'date',
  		required: true
  	},
  	circuito: {
  		model: 'circuito'
  	},
    temporadas: {
      collection: 'temporada',
      via: 'etapas'
    },
    categorias: {
      collection: 'categoria',
      via: 'etapas',
      dominant: true
    }
  }
};

