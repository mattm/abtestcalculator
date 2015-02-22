'use strict';

/**
 * Internal dependencies
 */
let NormalDistribution = require( './normal-distribution' );

// See: http://mathworld.wolfram.com/NormalDifferenceDistribution.html
function NormalDifferenceDistribution( proportionA, proportionB ) {
	let mean = proportionB.mean - proportionA.mean,
		sd = Math.sqrt( proportionA.variance + proportionB.variance );
	NormalDistribution.call( this, mean, sd );
}

NormalDifferenceDistribution.prototype = Object.create( NormalDistribution.prototype );
NormalDifferenceDistribution.prototype.constructor = NormalDifferenceDistribution;

module.exports = NormalDifferenceDistribution;
