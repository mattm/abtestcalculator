'use strict';

/**
 * Internal dependencies
 */
let config = require( '../config' ),
	canvasUtils = require( '../utils/canvas-utils' ),
	Rectangle = require( './rectangle' );

module.exports = {
	paintGraph: function( graphRenderer ) {
		graphRenderer.variations = [ this.props.variations.a, this.props.variations.b ];
		graphRenderer.rect = this.getGraphRectangle();
		graphRenderer.renderBackground();
		graphRenderer.render();
	},

	getGraphRectangle: function() {
		return new Rectangle(
			config.canvas.horizontalPadding,
			config.canvas.paddingTop,
			config.canvas.width - 2 * config.canvas.horizontalPadding,
			config.canvas.height - config.canvas.paddingTop - config.canvas.paddingBottom
		);
	},

	resetCanvas: function() {
		this.getCanvasContext().clearRect( 0, 0, config.canvas.width, config.canvas.height );
	},

	getCanvasContext: function() {
		return this.refs.canvas.getDOMNode().getContext( '2d' );
	},

	convertToHiDPICanvas: function() {
		let pixelRatio = canvasUtils.getPixelRatio(),
			canvas = this.refs.canvas.getDOMNode();

		canvas.width = config.canvas.width * pixelRatio;
		canvas.height = config.canvas.height * pixelRatio;
		canvas.style.width = config.canvas.width + 'px';
		canvas.style.height = config.canvas.height + 'px';
		canvas.getContext( '2d' ).setTransform( pixelRatio, 0, 0, pixelRatio, 0, 0 );
	},

	componentDidMount: function() {
		this.convertToHiDPICanvas();
		this.renderGraph();
	},

	componentDidUpdate: function() {
		this.resetCanvas();
		this.renderGraph();
	},
};
