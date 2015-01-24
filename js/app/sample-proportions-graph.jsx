'use strict';

/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */
var SampleProportionsGraphRenderer = require( './sample-proportions-graph-renderer' ),
	Rectangle = require( './rectangle' );

module.exports = React.createClass( {
	getPixelRatio: function() {
		var context = document.createElement( 'canvas' ).getContext( '2d' ),
			dpr = window.devicePixelRatio || 1,
			bsr = context.webkitBackingStorePixelRatio ||
				context.mozBackingStorePixelRatio ||
				context.msBackingStorePixelRatio ||
				context.oBackingStorePixelRatio ||
				context.backingStorePixelRatio || 1;
		return dpr / bsr;
	},

	convertToHiDPICanvas: function() {
		var pixelRatio = this.getPixelRatio(),
			canvas = this.refs.canvas.getDOMNode();

		canvas.width = this.props.width * pixelRatio;
		canvas.height = this.props.height * pixelRatio;
		canvas.style.width = this.props.width + 'px';
		canvas.style.height = this.props.height + 'px';
		canvas.getContext( '2d' ).setTransform( pixelRatio, 0, 0, pixelRatio, 0, 0 );
	},

	renderGraph: function() {
		var context = this.refs.canvas.getDOMNode().getContext( '2d' ),
			sampleProportionsGraph = new SampleProportionsGraphRenderer( context );
		sampleProportionsGraph.setRect( new Rectangle( 20, 20, 380, 180 ) );
		sampleProportionsGraph.renderBackground();
		sampleProportionsGraph.setVariations( this.props.variations );
		sampleProportionsGraph.render();
	},

	componentDidMount: function() {
		this.convertToHiDPICanvas();
		this.renderGraph();
	},

	render: function() {
		return (
			<canvas ref='canvas' width={ this.props.width } height={ this.props.height } />
		);
	}
} );
