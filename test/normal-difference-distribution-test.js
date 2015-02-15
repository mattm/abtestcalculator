'use strict';

/**
 * External dependencies
 */
var assert = require( 'assert' );

/**
 * Internal dependencies
 */
var NormalDifferenceDistribution = require( '../js/stats/normal-difference-distribution' ),
	SampleProportion = require( '../js/stats/sample-proportion' );

describe( 'normal difference distribution', function() {
	it( 'should calculate mean and sd', function() {
		var sampleProportionA = new SampleProportion( 100, 45 ),
			sampleProportionB = new SampleProportion( 100, 50 ),
			normalDifferenceDistribution = new NormalDifferenceDistribution( sampleProportionA, sampleProportionB );

		assert.equal( normalDifferenceDistribution.mean.toFixed( 2 ), 0.05 );
		assert.equal( normalDifferenceDistribution.sd, 0.07053367989832943 );
	} );
} );
