'use strict';

/**
 * Internal dependencies
 */
var constants = require( './constants' ),
	utils = require( './utils' );

module.exports = {
	convertToHiDPICanvas: function() {
		var pixelRatio = utils.getPixelRatio(),
			canvas = this.refs.canvas.getDOMNode();

		canvas.width = constants.CANVAS_WIDTH * pixelRatio;
		canvas.height = constants.CANVAS_HEIGHT * pixelRatio;
		canvas.style.width = constants.CANVAS_WIDTH + 'px';
		canvas.style.height = constants.CANVAS_HEIGHT + 'px';
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
