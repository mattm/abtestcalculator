'use strict';

/**
 * External dependencies
 */
var assert = require( 'assert' );

/**
 * Internal dependencies
 */
var SampleProportion = require( '../js/stats/sample-proportion' );

describe( 'sample proportion', function() {
	it( 'should calculate mean and sd', function() {
		var testSampleProportion = new SampleProportion( 100, 45 );
		assert.equal( testSampleProportion.mean, 0.45 );
		assert.equal( testSampleProportion.sd, 0.049749371855331 );
	} );
} );
