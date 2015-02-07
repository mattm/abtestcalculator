'use strict';

/**
 * External dependencies
 */
var React = require( 'react' );

module.exports = React.createClass( {
	render: function() {
		return (
			<input
				type="text"
				placeholder={ this.props.placeholderText}
				value={ this.props.value }
				onChange={ this.props.onChange }
				onFocus={ this.props.onFocus }
				onKeyDown={ this.props.onKeyDown } />
		);
	}
} );
