'use strict';

/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */
var analytics = require( './analytics' ),
	SampleProportionsGraph = require( './sample-proportions-graph' ),
	ABTestCalculator = require( './abtest-calculator-app' );

analytics.recordEvent( 'load_abtest_calculator' );

React.render(
	<ABTestCalculator />,
	document.getElementById( 'content' )
);
