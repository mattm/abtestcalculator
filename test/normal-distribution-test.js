'use strict';

/**
 * External dependencies
 */
var assert = require( 'assert' );

/**
 * Internal dependencies
 */
var NormalDistribution = require( '../js/stats/normal-distribution' );

var normalDistribution = new NormalDistribution( 0.45, 0.049749371855331 );

describe( 'normal distribution', function() {
	it( 'should set mean and sd', function() {
		assert.equal( normalDistribution.mean, 0.45 );
		assert.equal( normalDistribution.sd, 0.049749371855331 );
	} );

	it( 'should set variance', function() {
		assert.equal( normalDistribution.variance, 0.002475 );
	} );

	it( 'should calculate peak density', function() {
		assert.equal( normalDistribution.getPeakDensity(), 8.019041558183678 );
	} );

	it( 'should calculate x range', function() {
		assert.equal( normalDistribution.xRange.min, 0.251002512578676 );
		assert.equal( normalDistribution.xRange.max, 0.648997487421324 );
	} );

	it( 'should calculate x values', function() {
		var xMin = Math.min.apply( Math, normalDistribution.xValues ),
			xMax = Math.max.apply( Math, normalDistribution.xValues );

		assert.equal( xMin, 0.251002512578676 );
		assert.equal( xMax, 0.6485990940531132 );
	} );

	it( 'should calculate y values', function() {
		var yMin = Math.min.apply( Math, normalDistribution.yValues ),
			yMax = Math.max.apply( Math, normalDistribution.yValues );

		assert.equal( yMin, 0.0026900887543677508 );
		assert.equal( yMax, 8.018977277611471 );
	} );
} );
