'use strict';

/**
 * Internal dependencies
 */
var NormalDifferenceDistribution = require( '../stats/normal-difference-distribution' );

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
	},

	// See: http://blog.42floors.com/math-split-testing-part-2-chance-better/
	calculateProbabityBIsGratherThanA: function( proportionA, proportionB ) {
		var normalDifferenceDistribution = new NormalDifferenceDistribution( proportionA, proportionB );
		var z = ( proportionB.mean - proportionA.mean ) / ( normalDifferenceDistribution.sd * Math.sqrt(2) );
		return ( 1 + this.erf( z ) ) / 2;
	},

	// Adapted from http://picomath.org/javascript/erf.js.html
	erf: function( x ) {
		var a1 = 0.254829592;
		var a2 = -0.284496736;
		var a3 = 1.421413741;
		var a4 = -1.453152027;
		var a5 = 1.061405429;
		var p = 0.3275911;

		var sign = x < 0 ? -1 : 1;
		x = Math.abs( x );

		var t = 1 / (1 + p * x);
		var y = 1 - ( ( ( ( ( a5 * t + a4 ) * t ) + a3 ) * t + a2 ) * t + a1 ) * t * Math.exp( -x * x );

		return sign * y;
	}
};
