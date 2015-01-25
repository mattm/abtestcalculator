'use strict';

/**
 * External dependencies
 */
var React = require( 'react' ),
	isInteger = require( 'is-integer' );

/**
 * Internal dependencies
 */
var ConversionDataForm = require( './conversion-data-form' ),
	SampleProportionsGraph = require( './sample-proportions-graph' ),
	ImprovementGraph = require( './improvement-graph' ),
	Variation = require( './variation' ),
	ABTestSummary = require( './abtest-summary' );

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

	getVariations: function() {
		return {
			a: new Variation( 'Variation A', '#F1C40F', this.state.participantsA, this.state.conversionsA ),
			b: new Variation( 'Variation B', '#B6E2FF', this.state.participantsB, this.state.conversionsB )
		};
	},

	render: function() {
		var variations = this.getVariations(),
			analysis;

		if ( isInteger( this.state.participantsA ) && isInteger( this.state.conversionsA ) && isInteger( this.state.participantsB ) && isInteger( this.state.conversionsB ) ) {
			analysis = (
				<div className="analysis">
					<div className="graphs">
						<SampleProportionsGraph variations={ variations } />
						<ImprovementGraph variations={ variations } />
					</div>
					<ABTestSummary variations={ variations } />
				</div>
			);
		} else {
			analysis = (
				<div className="analysis">
					<p className="error">Participants and conversions must be integers.</p>
				</div>
			);
		}
		return (
			<div className="wrapper">
				<h1>A/B Test Calculator</h1>
				<ConversionDataForm variations={ variations } onUpdate={ this.updateConversionData } />
				{ analysis }
			</div>
		);
	}
} );
