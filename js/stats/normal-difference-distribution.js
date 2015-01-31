'use strict';

/**
 * Internal dependencies
 */
var NormalDistribution = require( './normal-distribution' );

// See: http://mathworld.wolfram.com/NormalDifferenceDistribution.html
function NormalDifferenceDistribution( proportionA, proportionB ) {
	var mean = proportionB.mean - proportionA.mean;
	var sd = Math.sqrt( proportionA.variance + proportionB.variance );
	NormalDistribution.call( this, mean, sd );
}

NormalDifferenceDistribution.prototype = Object.create( NormalDistribution.prototype );
NormalDifferenceDistribution.prototype.constructor = NormalDifferenceDistribution;

module.exports = NormalDifferenceDistribution;
