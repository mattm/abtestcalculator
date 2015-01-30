'use strict';

/**
 * External dependencies
 */
var React = require( 'react' ),
	isInteger = require( 'is-integer' ),
	ReactZeroClipboard = require( 'react-zeroclipboard' ),
	url = require( 'url' );

/**
 * Internal dependencies
 */
var ConversionDataForm = require( './conversion-data-form' ),
	SampleProportionsGraph = require( './sample-proportions-graph' ),
	ImprovementGraph = require( './improvement-graph' ),
	Variation = require( './variation' ),
	ABTestSummary = require( './abtest-summary' ),
	utils = require( './utils' );

module.exports = React.createClass( {
	getInitialState: function() {
		var params = url.parse( document.URL, true ).query,
			queryParticipantsA, queryConversionsA, queryParticipantsB, queryConversionsB,
			participantsA = 1000,
			conversionsA = 90,
			participantsB = 1000,
			conversionsB = 120;

		if ( params ) {
			queryParticipantsA = params.ap;
			queryConversionsA = params.ac;
			queryParticipantsB = params.bp;
			queryConversionsB = params.bc;

			if ( utils.isInteger( queryParticipantsA ) && utils.isInteger( queryConversionsA ) && utils.isInteger( queryParticipantsB ) && utils.isInteger( queryConversionsB ) ) {
				participantsA = +queryParticipantsA;
				conversionsA = +queryConversionsA;
				participantsB = +queryParticipantsB;
				conversionsB = +queryConversionsB;
			} else {
				// Rather than show an error message about not being able to parse the params
				// we'll simply not include any defaults in the fields
				participantsA = conversionsA = participantsB = conversionsB = '';
			}
		}

		return {
			participantsA: participantsA,
			conversionsA: conversionsA,
			participantsB: participantsB,
			conversionsB: conversionsB
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

	urlCopied: function() {
		alert( 'The URL for these results was copied to your clipboard.' );
	},

	render: function() {
		var variations = this.getVariations(), analysis, copyUrl, resultsUrl;

		if ( isInteger( this.state.participantsA ) && isInteger( this.state.conversionsA ) && isInteger( this.state.participantsB ) && isInteger( this.state.conversionsB ) ) {
			if ( utils.isCanvasSupported() ) {
				analysis = (
					<div className="analysis">
						<div className="graphs">
							<SampleProportionsGraph variations={ variations } />
							<ImprovementGraph variations={ variations } />
						</div>
						<ABTestSummary variations={ variations } />
					</div>
				);

				resultsUrl = 'http://www.abtestcalculator.com?ap=' + this.state.participantsA + '&ac=' + this.state.conversionsA + '&bp=' + this.state.participantsB + '&bc=' + this.state.conversionsB;
				copyUrl = (
					<div className="copy-url">
						<ReactZeroClipboard text={ resultsUrl } afterCopy={ this.urlCopied }>
							<button>Copy URL to Clipboard</button>
						</ReactZeroClipboard>
					</div>
				);
			} else {
				analysis = (
					<div className="analysis">
						<ABTestSummary variations={ variations } />
					</div>
				);
			}
		}

		return (
			<div>
				<div className="form-container">
					<ConversionDataForm variations={ variations } onUpdate={ this.updateConversionData } />
					{ copyUrl }
				</div>
				{ analysis }
			</div>
		);
	}
} );
