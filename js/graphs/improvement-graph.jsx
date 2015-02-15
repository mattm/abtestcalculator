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
	ImprovementGraphRenderer = require( './improvement-graph-renderer' );

module.exports = React.createClass( {
	mixins: [ GraphMixin ],

	renderGraph: function() {
		this.paintGraph( new ImprovementGraphRenderer( this.getCanvasContext() ) );
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
