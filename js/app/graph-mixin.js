'use strict';

/**
 * Internal dependencies
 */
var constants = require( './constants' ),
	Variation = require( './variation' ),
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

	getVariations: function() {
		var variations = [],
			variationA = new Variation( 'Variation A', '#F1C40F', this.props.participantsA, this.props.conversionsA ),
			variationB = new Variation( 'Variation B', '#B6E2FF', this.props.participantsB, this.props.conversionsB );
		variations.push( variationA );
		variations.push( variationB );
		return variations;
	},

	componentDidMount: function() {
		this.convertToHiDPICanvas();
		this.renderGraph();
	},

	componentDidUpdate: function() {
		this.renderGraph();
	},
};
