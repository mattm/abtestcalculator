/**
 * External dependencies
 */
var React = require( 'react' ),
	ReactZeroClipboard = require( 'react-zeroclipboard' );

/**
 * Internal dependencies
 */
var analytics = require( './analytics' );

module.exports = React.createClass( {
	getResultsURL: function() {
		var url, hasCustomVariationNames;

		url = 'http://www.abtestcalculator.com' +
			'?ap=' + this.props.variations.a.participants +
			'&ac=' + this.props.variations.a.conversions +
			'&bp=' + this.props.variations.b.participants +
			'&bc=' + this.props.variations.b.conversions;

		hasCustomVariationNames = this.props.variations.a.name !== 'Variation A' || this.props.variations.b.name !== 'Variation B';

		if ( hasCustomVariationNames ) {
			url += '&an=' + encodeURIComponent( this.props.variations.a.name ) +
				'&bn=' + encodeURIComponent( this.props.variations.b.name );
		}

		return url;
	},

	urlCopied: function() {
		analytics.recordEvent( 'copy results url' );
		alert( 'The URL for these A/B test results was successfully copied to your clipboard.' );
	},

	render: function() {
		if ( ! this.props.isValid ) {
			return null;
		}

		return (
			<div className="copy-url">
				<ReactZeroClipboard text={ this.getResultsURL() } onAfterCopy={ this.urlCopied }>
					Copy Results URL
				</ReactZeroClipboard>
			</div>
		);
	},
} );
