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
			changeInWords = <p><span className="variation-a">Variation A</span> performed <strong>{variationAImprovement}% better</strong> than <span className="variation-b">Variation B</span>.</p>;
		} else if ( variationBImprovement > 0 ) {
			changeInWords = <p><span className="variation-b">Variation B</span> performed <strong>{variationBImprovement}% better</strong> than <span className="variation-a">Variation A</span>.</p>;
		} else {
			changeInWords = <p><span className="variation-b">Variation B</span> performed the same as <span className="variation-a">Variation A</span>.</p>;
		}

		if ( variationBImprovement < 0 ) {
			oddsOfImprovementInWords = <p>There is a <strong>{pAGreaterThanB}%</strong> chance that the changes in <span className="variation-a">Variation A</span> will improve your conversion rate.</p>;
		} else {
			oddsOfImprovementInWords = <p>There is a <strong>{pBGreaterThanA}%</strong> chance that the changes in <span className="variation-b">Variation B</span> will improve your conversion rate.</p>;
		}

		if ( pBGreaterThanA >= 80 || pAGreaterThanB >= 80 ) {
			significanceInWords = <p>Your A/B test is statistically significant!</p>;
		} else {
			significanceInWords = <p>Your A/B test is NOT statistically significant.</p>;
		}

		return (
			<div className='significance'>
				{ changeInWords }
				{ oddsOfImprovementInWords }
				{ significanceInWords }
			</div>
		);
	}
} );
