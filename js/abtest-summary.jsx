'use strict';

/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */
var utils = require( './utils' );

module.exports = React.createClass( {

	// TODO: There's probably a more elegant way to do this...

	getChangeInWords: function() {
		if ( this.wasTestATie() ) {
			return (
				<p>
					{ this.getVariationBPossessiveElement() } observed conversion rate was the same
					as { this.getVariationAPossessiveElement() } conversion rate.
				</p>
			);
		} else {
			return (
				<p>
					{ this.getWinningVariationPossessiveElement() } observed conversion rate
					({ this.getWinningConversionRate() }%) was { this.getPercentageImprovement() }%
					higher than { this.getLosingVariationPossessiveElement() } conversion rate
					({ this.getLosingConversionRate() }%).
				</p>
			);
		}
	},

	getVariationBElement: function() {
		return <span className="variation-b">Variation B</span>;
	},

	getVariationAElement: function() {
		return <span className="variation-a">Variation A</span>;
	},

	getWinningVariationElement: function() {
		return this.wasVariationBTheWinner() ? this.getVariationBElement() : this.getVariationAElement();
	},

	getLosingVariationElement: function() {
		return this.wasVariationBTheWinner() ? this.getVariationAElement() : this.getVariationBElement();
	},

	getVariationBPossessiveElement: function() {
		return <span className="variation-b">Variation B&#8217;s</span>;
	},

	getVariationAPossessiveElement: function() {
		return <span className="variation-a">Variation A&#8217;s</span>;
	},

	getWinningVariationPossessiveElement: function() {
		return this.wasVariationBTheWinner() ? this.getVariationBPossessiveElement() : this.getVariationAPossessiveElement();
	},

	getLosingVariationPossessiveElement: function() {
		return this.wasVariationBTheWinner() ? this.getVariationAPossessiveElement() : this.getVariationBPossessiveElement();
	},

	getWinningConversionRate: function() {
		return this.wasVariationBTheWinner() ? this.getVariationBConversionRate() : this.getVariationAConversionRate();
	},

	getLosingConversionRate: function() {
		return this.wasVariationBTheWinner() ? this.getVariationAConversionRate() : this.getVariationBConversionRate();
	},

	getVariationAImprovement: function() {
		return Math.round( ( this.props.variations.a.proportion.mean / this.props.variations.b.proportion.mean - 1 ) * 100 );
	},

	getVariationBImprovement: function() {
		return Math.round( ( this.props.variations.b.proportion.mean / this.props.variations.a.proportion.mean - 1 ) * 100 );
	},

	getVariationBConversionRate: function() {
		return Math.round( this.props.variations.b.proportion.mean * 10000 ) / 100;
	},

	getVariationAConversionRate: function() {
		return Math.round( this.props.variations.a.proportion.mean * 10000 ) / 100;
	},

	getPercentageImprovement: function() {
		return this.wasVariationBTheWinner() ? this.getVariationBImprovement() : this.getVariationAImprovement();
	},

	wasVariationBTheWinner: function() {
		return this.getVariationBImprovement() > 0;
	},

	wasTestATie: function() {
		return this.getVariationBImprovement() === 0;
	},

	oddsOfImprovementInWords: function() {
		var onlyWording = this.isSignificant() ? '' : 'only ';

		return (
			<p>
				There is {onlyWording}a { this.getOddsOfImprovement() }% chance
				that { this.getWinningVariationElement() } has a higher conversion rate.
			</p>
		);
	},

	getOddsOfImprovement: function() {
		var probability = this.wasVariationBTheWinner() ? this.getProbabilityBGreaterThanA() : this.getProbabilityAGreaterThanB();
		return Math.round( probability * 100 );
	},

	getProbabilityBGreaterThanA: function() {
		return 1 - this.getProbabilityAGreaterThanB();
	},

	getProbabilityAGreaterThanB: function() {
		return utils.calculateProbabityBIsGratherThanA( this.props.variations.b.proportion, this.props.variations.a.proportion );
	},

	isSignificant: function() {
		return this.getOddsOfImprovement() >= 80;
	},

	getSignificanceInWords: function() {
		if ( this.isSignificant() ) {
			return <p>This means your A/B test <i>is</i> statistically significant!</p>;
		} else {
			return <p>This means your A/B test <i>is NOT</i> statistically significant.</p>;
		}
	},

	render: function() {
		return (
			<div className="summary">
				{ this.getChangeInWords() }
				{ this.oddsOfImprovementInWords() }
				{ this.getSignificanceInWords() }
			</div>
		);
	}
} );
