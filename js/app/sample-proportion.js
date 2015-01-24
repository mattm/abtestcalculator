'use strict';

/**
 * Internal dependencies
 */
var NormalDistribution = require( './normal-distribution' );

function SampleProportion( participants, conversions ) {
	var mean = conversions / participants;
	var sd = Math.sqrt( mean * ( 1 - mean ) / participants );
	NormalDistribution.call( this, mean, sd );
}

SampleProportion.prototype = Object.create( NormalDistribution.prototype );
SampleProportion.prototype.constructor = SampleProportion;

module.exports = SampleProportion;
