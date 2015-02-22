'use strict';

/**
 * External dependencies
 */
let React = require( 'react' );

/**
 * Internal dependencies
 */
let statUtils = require( './stats/stat-utils' );

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

	oddsOfImprovementInWords: function() {
		let onlyWording = this.isSignificant() ? '' : 'only ',
			winningElement = this.wasTestATie() ? this.getVariationBElement() : this.getWinningVariationElement();

		return (
			<p>
				There is {onlyWording}a { this.getOddsOfImprovement() }% chance
				that { winningElement } has a higher conversion rate.
			</p>
		);
	},

	getSignificanceInWords: function() {
		let verb = this.isSignificant() ? 'can' : 'cannot';
		return <p>You {verb} be confident that this result is a consequence of the changes you made and not a result of random chance.</p>;
	},

	getVariationBElement: function() {
		return <span className="variation-b">{ this.props.variations.b.name }</span>;
	},

	getVariationAElement: function() {
		return <span className="variation-a">{ this.props.variations.a.name }</span>;
	},

	getWinningVariationElement: function() {
		return this.wasVariationBTheWinner() ? this.getVariationBElement() : this.getVariationAElement();
	},

	getLosingVariationElement: function() {
		return this.wasVariationBTheWinner() ? this.getVariationAElement() : this.getVariationBElement();
	},

	getVariationBPossessiveElement: function() {
		return <span className="variation-b">{ this.props.variations.b.name }&#8217;s</span>;
	},

	getVariationAPossessiveElement: function() {
		return <span className="variation-a">{ this.props.variations.a.name }&#8217;s</span>;
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

	getOddsOfImprovement: function() {
		let probability = this.wasVariationBTheWinner() ? this.getProbabilityBGreaterThanA() : this.getProbabilityAGreaterThanB();
		return Math.round( probability * 100 );
	},

	getProbabilityBGreaterThanA: function() {
		return 1 - this.getProbabilityAGreaterThanB();
	},

	getProbabilityAGreaterThanB: function() {
		return statUtils.calculateProbabityBIsGratherThanA( this.props.variations.b.proportion, this.props.variations.a.proportion );
	},

	isSignificant: function() {
		return this.getOddsOfImprovement() >= 90;
	},

	render: function() {
		return (
			<div className="summary">
				<h3>Executive Summary</h3>
				{ this.getChangeInWords() }
				{ this.oddsOfImprovementInWords() }
				{ this.getSignificanceInWords() }
			</div>
		);
	}
} );
