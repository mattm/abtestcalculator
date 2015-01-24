'use strict';

/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */
var ConversionDataForm = require( './conversion-data-form' ),
	SampleProportionsGraph = require( './sample-proportions-graph' ),
	ImprovementGraph = require( './improvement-graph' );

module.exports = React.createClass( {
	getInitialState: function() {
		return {
			participantsA: 1000,
			conversionsA: 90,
			participantsB: 1000,
			conversionsB: 120
		};
	},

	updateConversionData: function( participantsA, conversionsA, participantsB, conversionsB ) {
		this.setState( {
			participantsA: participantsA,
			conversionsA: conversionsA,
			participantsB: participantsB,
			conversionsB: conversionsB
		} );
	},

	render: function() {
		return (
			<div className="wrapper">
				<h1>A/B Test Calculator</h1>
				<ConversionDataForm
					participantsA={ this.state.participantsA }
					conversionsA={ this.state.conversionsA }
					participantsB={ this.state.participantsB }
					conversionsB={ this.state.conversionsB }
					onUpdate={ this.updateConversionData } />
				<div className="graphs">
					<SampleProportionsGraph
						participantsA={ this.state.participantsA }
						conversionsA={ this.state.conversionsA }
						participantsB={ this.state.participantsB }
						conversionsB={ this.state.conversionsB } />
					<ImprovementGraph
						participantsA={ this.state.participantsA }
						conversionsA={ this.state.conversionsA }
						participantsB={ this.state.participantsB }
						conversionsB={ this.state.conversionsB } />
				</div>
			</div>
		);
	}
} );
