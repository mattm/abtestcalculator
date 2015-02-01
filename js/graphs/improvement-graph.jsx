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
	ImprovementGraphRenderer = require( './improvement-graph-renderer' ),
	Rectangle = require( './rectangle' );

module.exports = React.createClass( {
	mixins: [ GraphMixin ],

	renderGraph: function() {
		var context = this.refs.canvas.getDOMNode().getContext( '2d' ),
			improvementGraph = new ImprovementGraphRenderer( context ),
			rectangle = new Rectangle( constants.CANVAS_HORIZONTAL_PADDING, constants.CANVAS_PADDING_TOP, constants.CANVAS_WIDTH - 2 * constants.CANVAS_HORIZONTAL_PADDING, constants.CANVAS_HEIGHT - constants.CANVAS_PADDING_TOP - constants.CANVAS_PADDING_BOTTOM );
		context.clearRect( 0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT );
		improvementGraph.setRect( rectangle );
		improvementGraph.renderBackground();
		improvementGraph.setVariations( this.props.variations );
		improvementGraph.render();
	},

	render: function() {
		return (
			<div className="graph">
				<h3>Improvement Distribution</h3>
				<canvas ref='canvas' />
				<p>
					if you change from <span className="variation-a">Variation A</span>&nbsp;
					to <span className="variation-b">Variation B</span> the <br/> improvement
					you will see in the long run falls<br/> somewhere within this bell curve
				</p>
			</div>
		);
	}
} );
