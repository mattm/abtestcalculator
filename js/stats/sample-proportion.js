'use strict';

/**
 * Internal dependencies
 */
let NormalDistribution = require( './normal-distribution' );

class SampleProportion extends NormalDistribution {
	constructor( participants, conversions ) {
		let mean = conversions / participants,
			sd = Math.sqrt( mean * ( 1 - mean ) / participants );

		super( mean, sd );
	}
}

module.exports = SampleProportion;
