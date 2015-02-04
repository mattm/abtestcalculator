'use strict';

/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */
var config = require( '../config' ),
	GraphMixin = require( './graph-mixin' ),
	ImprovementGraphRenderer = require( './improvement-graph-renderer' ),
	Rectangle = require( './rectangle' );

module.exports = React.createClass( {
	mixins: [ GraphMixin ],

	renderGraph: function() {
		var context = this.refs.canvas.getDOMNode().getContext( '2d' ),
			improvementGraph = new ImprovementGraphRenderer( context ),
			rectangle = new Rectangle( config.canvas.horizontalPadding, config.canvas.paddingTop, config.canvas.width - 2 * config.canvas.horizontalPadding, config.canvas.height - config.canvas.paddingTop - config.canvas.paddingBottom );
		context.clearRect( 0, 0, config.canvas.width, config.canvas.height );
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
					if you change from <span className="variation-a">{ this.props.variations.a.name }</span> to&nbsp;
					<span className="variation-b">{ this.props.variations.b.name }</span> the <br/> improvement
					you will see in the long run falls<br/> somewhere within this bell curve
				</p>
			</div>
		);
	}
} );
