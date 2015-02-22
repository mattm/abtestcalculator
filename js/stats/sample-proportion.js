'use strict';

/**
 * Internal dependencies
 */
let NormalDistribution = require( './normal-distribution' );

function SampleProportion( participants, conversions ) {
	let mean = conversions / participants,
		sd = Math.sqrt( mean * ( 1 - mean ) / participants );

	NormalDistribution.call( this, mean, sd );
}

SampleProportion.prototype = Object.create( NormalDistribution.prototype );
SampleProportion.prototype.constructor = SampleProportion;

module.exports = SampleProportion;
