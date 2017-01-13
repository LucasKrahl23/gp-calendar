/**
 * Country.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	alpha2: {
  		type: 'string',
  		required: true
  	},
  	alpha3: {
  		type: 'string',
  		required: true
  	},
  	langcs: {
  		type: 'string',
  		required: true
  	},
  	langde: {
  		type: 'string',
  		required: true
  	},
  	langen: {
  		type: 'string',
  		required: true
  	},
  	langes: {
  		type: 'string',
  		required: true
  	},
  	langfr: {
  		type: 'string',
  		required: true
  	},
  	langit: {
  		type: 'string',
  		required: true
  	},
  	langnl: {
  		type: 'string',
  		required: true
  	},
  }
};