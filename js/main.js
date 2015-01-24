'use strict';

/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */
var SampleProportionsGraph = require( './app/sample-proportions-graph' ),
	ConversionDataForm = require( './app/conversion-data-form' ),
	Variation = require( './app/variation' );

var data = {
	title: 'Original vs Variation',
	variations: [
		{
			name: 'Original',
			participants: 100,
			conversions: 45,
			color: '#966F33'
		},
		{
			name: 'Variation',
			participants: 100,
			conversions: 51,
			color: '#3158F2'
		}
	]
};

var variations = [],
	item,
	variation;

for ( var i = 0, l = data.variations.length; i < l; i++ ) {
	item = data.variations[ i ];
	variation = new Variation( item.name, item.color, item.participants, item.conversions );
	// console.log( variation );
	console.log( variation.name, variation.proportion.mean );
	variations.push( variation );
}

// console.log( variations );

React.render(
	// <SampleProportionsGraph width='480' height='250' variations={ variations } />,
	<ConversionDataForm/>,
	document.getElementById( 'test' )
);

// $('html').css('background-color', 'green' );

// addHiDpiCanvasToBody()

// require.config( {
// 	baseUrl: 'js/lib',
// 	paths: {
// 		app: '../app',
// 		jquery: 'jquery-2.1.1.min',
// 		lodash: 'lodash.min',
// 		numeral: 'numeral.min',
// 		// text: 'text'
// 	}
// } );



// require( [ 'app/normal-distribution', 'app/sample-proportion', 'jquery', 'app/hidpi-canvas', 'app/sample-proportions-graph-renderer', 'app/improvement-graph-renderer', 'app/variation', 'app/rectangle' ],
// 	function( NormalDistribution, SampleProportion, $, HiDpiCanvas, SampleProportionsGraphRenderer, ImprovementGraphRenderer, Variation, Rectangle ) {

// 	//addHiDpiCanvasToBody = ->
// 	//	$('body').append HiDpiCanvas.create 'sample-proportion', 480, 420

// 	// x = new SampleProportion(100, 45);
// 	// console.log( x.variance );
// 	// return;

// 	$( function() {

// 		//
// 		$('body').append( HiDpiCanvas.create( 'sample-proportions', 480, 250 ) );
// 		$('body').append( HiDpiCanvas.create( 'improvement', 480, 250 ) );

// 		// r = new CanvasGraphRenderer 'main'
// 		// r.setRect new Rectangle 50, 50, 100, 100
// 		// r.renderBackground()

// 		sampleProportionsGraph = new SampleProportionsGraphRenderer( 'sample-proportions' );
// 		sampleProportionsGraph.setRect( new Rectangle( 20, 20, 380, 180 ) );
// 		sampleProportionsGraph.renderBackground();
// 		sampleProportionsGraph.setVariations( variations );
// 		sampleProportionsGraph.render();

// 		improvementGraph = new ImprovementGraphRenderer( 'improvement' );
// 		improvementGraph.setRect( new Rectangle( 20, 20, 380, 180 ) );
// 		improvementGraph.renderBackground();
// 		improvementGraph.setVariations( variations );
// 		improvementGraph.render();
// 	} );
// } );