'use strict';

/**
 * Internal dependencies
 */
var config = require( '../config' ),
	canvasUtils = require( '../utils/canvas-utils' );

module.exports = {
	convertToHiDPICanvas: function() {
		var pixelRatio = canvasUtils.getPixelRatio(),
			canvas = this.refs.canvas.getDOMNode();

		canvas.width = config.CANVAS_WIDTH * pixelRatio;
		canvas.height = config.CANVAS_HEIGHT * pixelRatio;
		canvas.style.width = config.CANVAS_WIDTH + 'px';
		canvas.style.height = config.CANVAS_HEIGHT + 'px';
		canvas.getContext( '2d' ).setTransform( pixelRatio, 0, 0, pixelRatio, 0, 0 );
	},

	componentDidMount: function() {
		this.convertToHiDPICanvas();
		this.renderGraph();
	},

	componentDidUpdate: function() {
		this.renderGraph();
	},
};
