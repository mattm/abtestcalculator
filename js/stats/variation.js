'use strict';

/**
 * Internal dependencies
 */
var SampleProportion = require( './sample-proportion' );

function Variation( name, color, participants, conversions ) {
	this.name = name;
	this.color = color;
	this.participants = participants;
	this.conversions = conversions;
	this.proportion = new SampleProportion( participants, conversions );
}

// See: http://blog.42floors.com/math-split-testing-part-2-chance-better/
Variation.prototype.isGaussian = function() {
	var np = this.participants * this.proportion.mean,
		nq = this.participants * ( 1 - this.proportion.mean );

	return this.participants >= 30 && np >= 5 && nq >= 5;
}

module.exports = Variation;
