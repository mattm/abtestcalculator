'use strict';

module.exports = {
	isIntegerString: function( string ) {
		return /^\d+$/.test( string );
	},

	integerStringToInteger: function( string ) {
		return this.isIntegerString( string ) ? parseInt( string ) : string;
	},

	ratioToPercentage: function( ratio ) {
		return ( ratio * 100 ) + '%';
	},

	formatPercentageImprovement: function( percentage ) {
		var sign = percentage > 0 ? '+' : '';
		return sign + percentage + '%';
	}
};
