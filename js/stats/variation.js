'use strict';

/**
 * Internal dependencies
 */
let SampleProportion = require( './sample-proportion' );

class Variation {
	constructor( name, color, participants, conversions ) {
		this.name = name;
		this.color = color;
		this.participants = participants;
		this.conversions = conversions;
		this.proportion = new SampleProportion( participants, conversions );
	}

	// See: http://blog.42floors.com/math-split-testing-part-2-chance-better/
	isGaussian() {
		let np = this.participants * this.proportion.mean,
			nq = this.participants * ( 1 - this.proportion.mean );

		return this.participants >= 30 && np >= 5 && nq >= 5;
	};
}

module.exports = Variation;
