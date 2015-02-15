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
	SampleProportionsGraphRenderer = require( './sample-proportions-graph-renderer' );

module.exports = React.createClass( {
	mixins: [ GraphMixin ],

	renderGraph: function() {
		this.paintGraph( new SampleProportionsGraphRenderer( this.getCanvasContext() ) );
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
