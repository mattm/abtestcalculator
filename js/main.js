'use strict';

/**
 * External dependencies
 */
var React = require( 'react' ),
	url = require( 'url' );

/**
 * Internal dependencies
 */
var analytics = require( './analytics' ),
	SampleProportionsGraph = require( './graphs/sample-proportions-graph' ),
	App = require( './app' );

var urlParams = url.parse( document.URL, true ).query,
	hasUrlParams = urlParams.hasOwnProperty('ap') && urlParams.hasOwnProperty('ac') && urlParams.hasOwnProperty('bp') && urlParams.hasOwnProperty('bc');

analytics.recordEvent( 'load abtest calculator', { 'has params' : hasUrlParams } );

React.render(
	<App />,
	document.getElementById( 'content' )
);
