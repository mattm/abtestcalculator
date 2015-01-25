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
		var variationAImprovement = Math.round( ( this.props.variations.a.proportion.mean / this.props.variations.b.proportion.mean - 1 ) * 100 ),
			variationBImprovement = Math.round( ( this.props.variations.b.proportion.mean / this.props.variations.a.proportion.mean - 1 ) * 100 ),
			pAGreaterThanB = Math.round( utils.calculateProbabityBIsGratherThanA( this.props.variations.b.proportion, this.props.variations.a.proportion ) * 100 ),
			pBGreaterThanA = 100 - pAGreaterThanB,
			changeInWords,
			oddsOfImprovementInWords,
			significanceInWords;

		if ( variationBImprovement < 0 ) {
			changeInWords = 'Variation A performed ' + variationAImprovement + '% better than variation A.';
		} else {
			changeInWords = 'Variation B performed ' + variationBImprovement + '% better than variation A.';
		}

		if ( variationBImprovement < 0 ) {
			oddsOfImprovementInWords = 'There is a ' + pAGreaterThanB + '% chages that the changes in variation A will improve your conversion rate.';
		} else {
			oddsOfImprovementInWords = 'There is a ' + pBGreaterThanA + '% chance that the changes in variation B will improve your conversion rate.';
		}

		if ( pBGreaterThanA >= 80 || pAGreaterThanB >= 80 ) {
			significanceInWords = 'Your A/B test is statistically significant!'
		} else {
			significanceInWords = 'Your A/B test is NOT statistically significant.'
		}

		return (
			<div className='significance'>
				<p>{ changeInWords }</p>
				<p>{ oddsOfImprovementInWords }</p>
				<p>{ significanceInWords }</p>
			</div>
		);
	}
} );
