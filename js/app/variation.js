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

module.exports = Variation;
