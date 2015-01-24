'use strict';

/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */
var constants = require( './constants' ),
	ImprovementGraphRenderer = require( './improvement-graph-renderer' ),
	Rectangle = require( './rectangle' ),
	Variation = require( './variation' );

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

		canvas.width = constants.CANVAS_WIDTH * pixelRatio;
		canvas.height = constants.CANVAS_HEIGHT * pixelRatio;
		canvas.style.width = constants.CANVAS_WIDTH + 'px';
		canvas.style.height = constants.CANVAS_HEIGHT + 'px';
		canvas.getContext( '2d' ).setTransform( pixelRatio, 0, 0, pixelRatio, 0, 0 );
	},

	getVariations: function() {
		var variations = [],
			variationA = new Variation( 'Variation A', '#966F33', this.props.participantsA, this.props.conversionsA ),
			variationB = new Variation( 'Variation B', '#3158F2', this.props.participantsB, this.props.conversionsB );
		variations.push( variationA );
		variations.push( variationB );
		return variations;
	},

	renderGraph: function() {
		var context = this.refs.canvas.getDOMNode().getContext( '2d' ),
			improvementGraph = new ImprovementGraphRenderer( context ),
			rectangle = new Rectangle( constants.CANVAS_HORIZONTAL_PADDING, constants.CANVAS_PADDING_TOP, constants.CANVAS_WIDTH - 2 * constants.CANVAS_HORIZONTAL_PADDING, constants.CANVAS_HEIGHT - constants.CANVAS_PADDING_TOP - constants.CANVAS_PADDING_BOTTOM );
		improvementGraph.setRect( rectangle );
		improvementGraph.renderBackground();
		improvementGraph.setVariations( this.getVariations() );
		improvementGraph.render();
	},

	componentDidMount: function() {
		this.convertToHiDPICanvas();
		this.renderGraph();
	},

	componentDidUpdate: function() {
		this.renderGraph();
	},

	render: function() {
		return (
			<canvas ref='canvas' />
		);
	}
} );
