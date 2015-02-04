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
	SampleProportionsGraphRenderer = require( './sample-proportions-graph-renderer' ),
	Rectangle = require( './rectangle' );

module.exports = React.createClass( {
	mixins: [ GraphMixin ],

	renderGraph: function() {
		var context = this.refs.canvas.getDOMNode().getContext( '2d' ),
			sampleProportionsGraph = new SampleProportionsGraphRenderer( context ),
			rectangle = new Rectangle( config.canvas.horizontalPadding, config.canvas.paddingTop, config.canvas.width - 2 * config.canvas.horizontalPadding, config.canvas.height - config.canvas.paddingTop - config.canvas.paddingBottom );
		context.clearRect( 0, 0, config.canvas.width, config.canvas.height );
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
				<p>
					the true conversion rates (the numbers you would get if you ran<br/> the test forever)
					for <span className="variation-a">{ this.props.variations.a.name }</span>
					&nbsp;and <span className="variation-b">{ this.props.variations.b.name }</span>&nbsp; fall somewhere<br/>
					within their respective bell curves above
				</p>
			</div>
		);
	}
} );
