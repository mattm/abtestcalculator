'use strict';

/**
 * Internal dependencies
 */
let NormalDifferenceDistribution = require( './normal-difference-distribution' );

module.exports = {

	// See: http://blog.42floors.com/math-split-testing-part-2-chance-better/
	calculateProbabityBIsGratherThanA: function( proportionA, proportionB ) {
		let normalDifferenceDistribution = new NormalDifferenceDistribution( proportionA, proportionB ),
			z = ( proportionB.mean - proportionA.mean ) / ( normalDifferenceDistribution.sd * Math.sqrt(2) );

		return ( 1 + this.erf( z ) ) / 2;
	},

	// Adapted from http://picomath.org/javascript/erf.js.html
	erf: function( x ) {
		let a1 = 0.254829592,
			a2 = -0.284496736,
			a3 = 1.421413741,
			a4 = -1.453152027,
			a5 = 1.061405429,
			p = 0.3275911,
			sign = x < 0 ? -1 : 1,
			t, y;

		x = Math.abs( x );
		t = 1 / (1 + p * x);
		y = 1 - ( ( ( ( ( a5 * t + a4 ) * t ) + a3 ) * t + a2 ) * t + a1 ) * t * Math.exp( -x * x );

		return sign * y;
	}
};
