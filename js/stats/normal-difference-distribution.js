'use strict';

/**
 * Internal dependencies
 */
let NormalDistribution = require( './normal-distribution' );

// See: http://mathworld.wolfram.com/NormalDifferenceDistribution.html
class NormalDifferenceDistribution extends NormalDistribution {
	constructor( proportionA, proportionB ) {
		let mean = proportionB.mean - proportionA.mean,
			sd = Math.sqrt( proportionA.variance + proportionB.variance );
		super( mean, sd );
	}
}

module.exports = NormalDifferenceDistribution;
