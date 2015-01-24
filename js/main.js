'use strict';

/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */
var SampleProportionsGraph = require( './app/sample-proportions-graph' ),
	ABTestCalculator = require( './app/abtest-calculator-app' );

React.render(
	<ABTestCalculator />,
	document.getElementById( 'test' )
);
