'use strict';

/**
 * External dependencies
 */
let React = require( 'react' ),
	url = require( 'url' );

/**
 * Internal dependencies
 */
let analytics = require( './analytics' ),
	App = require( './app' );

let urlParams = url.parse( document.URL, true ).query,
	hasUrlParams = urlParams.hasOwnProperty('ap') && urlParams.hasOwnProperty('ac') && urlParams.hasOwnProperty('bp') && urlParams.hasOwnProperty('bc');

analytics.recordEvent( 'load abtest calculator', { 'has params' : hasUrlParams } );

React.render(
	<App />,
	document.getElementById( 'content' )
);
