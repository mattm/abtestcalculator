'use strict';

module.exports = {
	isInteger: function( string ) {
		return /^\d+$/.test( string );
	},

	ratioToPercentage: function( ratio ) {
		return ( ratio * 100 ) + '%';
	},

	formatPercentageImprovement: function( percentage ) {
		var sign = percentage > 0 ? '+' : '';
		return sign + percentage + '%';
	}
};
