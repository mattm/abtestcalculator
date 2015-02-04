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
		this.renderGraph();
	},
};
