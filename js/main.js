'use strict';

/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */
var SampleProportionsGraph = require( './sample-proportions-graph' ),
	ABTestCalculator = require( './abtest-calculator-app' );

React.render(
	<ABTestCalculator />,
	document.getElementById( 'content' )
);
