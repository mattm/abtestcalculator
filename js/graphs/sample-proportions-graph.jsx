'use strict';

/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */
var constants = require( '../constants' ),
	GraphMixin = require( './graph-mixin' ),
	SampleProportionsGraphRenderer = require( './sample-proportions-graph-renderer' ),
	Rectangle = require( '../rectangle' );

module.exports = React.createClass( {
	mixins: [ GraphMixin ],

	renderGraph: function() {
		var context = this.refs.canvas.getDOMNode().getContext( '2d' ),
			sampleProportionsGraph = new SampleProportionsGraphRenderer( context ),
			rectangle = new Rectangle( constants.CANVAS_HORIZONTAL_PADDING, constants.CANVAS_PADDING_TOP, constants.CANVAS_WIDTH - 2 * constants.CANVAS_HORIZONTAL_PADDING, constants.CANVAS_HEIGHT - constants.CANVAS_PADDING_TOP - constants.CANVAS_PADDING_BOTTOM );
		context.clearRect( 0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT );
		sampleProportionsGraph.setRect( rectangle );
		sampleProportionsGraph.renderBackground();
		sampleProportionsGraph.setVariations( this.props.variations );
		sampleProportionsGraph.render();
	},

	render: function() {
		return (
			<div className="graph">
				<h3>Conversion Rate Distributions</h3>
				<canvas ref='canvas' />
				<p>the true conversion rates for <span className="variation-a">Variation A</span> and <span className="variation-b">Variation B</span><br/> fall somewhere within their respective distributions above</p>
			</div>
		);
	}
} );
