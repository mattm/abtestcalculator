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
	render: function() {
		var variationAConversionRate = Math.round( this.props.variations.a.proportion.mean * 10000 ) / 100,
			variationBConversionRate = Math.round( this.props.variations.b.proportion.mean * 10000 ) / 100,
			variationAImprovement = Math.round( ( this.props.variations.a.proportion.mean / this.props.variations.b.proportion.mean - 1 ) * 100 ),
			variationBImprovement = Math.round( ( this.props.variations.b.proportion.mean / this.props.variations.a.proportion.mean - 1 ) * 100 ),
			pAGreaterThanB = Math.round( utils.calculateProbabityBIsGratherThanA( this.props.variations.b.proportion, this.props.variations.a.proportion ) * 100 ),
			pBGreaterThanA = 100 - pAGreaterThanB,
			winningVariationPossessive,
			winningVariation,
			winningConversionRate,
			losingVariationPossessive,
			losingVariation,
			losingConversionRate,
			percentageImprovement,
			conversionRatesInWords,
			changeInWords,
			isSignificant,
			oddsOfImprovement,
			onlyWording,
			oddsOfImprovementInWords,
			significanceInWords;

		if ( variationBImprovement !== 0 ) {
			if ( variationBImprovement > 0 ) {
				winningVariationPossessive = <span className="variation-b">Variation B&#8217;s</span>;
				winningVariation = <span className="variation-b">Variation B</span>;
				losingVariationPossessive = <span className="variation-a">Variation A&#8217;s</span>;
				losingVariation = <span className="variation-a">Variation A</span>;
				winningConversionRate = variationBConversionRate;
				losingConversionRate = variationAConversionRate;
				percentageImprovement = variationBImprovement;
				oddsOfImprovement = pBGreaterThanA;
			} else {
				winningVariationPossessive = <span className="variation-a">Variation A&#8217;s</span>;
				winningVariation = <span className="variation-a">Variation A</span>;
				losingVariationPossessive = <span className="variation-b">Variation B&#8217;s</span>;
				losingVariation = <span className="variation-b">Variation B</span>;
				winningConversionRate = variationAConversionRate;
				losingConversionRate = variationBConversionRate;
				percentageImprovement = variationAImprovement;
				oddsOfImprovement = pAGreaterThanB;
			}

			changeInWords = (
				<p>
					{ winningVariationPossessive } observed conversion rate ({ winningConversionRate }%) was { percentageImprovement }% higher than { losingVariationPossessive } conversion rate ({ losingConversionRate }%).
				</p>
			);
		} else {
			changeInWords = <p><span className="variation-b">Variation B</span> had the same conversion rate as <span className="variation-a">Variation A</span>.</p>;
			winningVariation = <span className="variation-b">Variation B</span>;
			losingVariation = <span className="variation-a">Variation A</span>;
			oddsOfImprovement = pBGreaterThanA;
		}

		isSignificant = pBGreaterThanA >= 80 || pAGreaterThanB >= 80;
		onlyWording = isSignificant ? '' : 'only ';
		oddsOfImprovementInWords = <p>There is {onlyWording}a { oddsOfImprovement }% chance that { winningVariation } really does has a higher conversion rate than { losingVariation }.</p>;

		if ( isSignificant ) {
			significanceInWords = <p>This means your A/B test <i>is</i> statistically significant!</p>;
		} else {
			significanceInWords = <p>This means your A/B test <i>is NOT</i> statistically significant.</p>;
		}

		return (
			<div className="summary">
				{ changeInWords }
				{ oddsOfImprovementInWords }
				{ significanceInWords }
			</div>
		);
	}
} );
