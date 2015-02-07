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
				ref="participantsA"
				placeholder={ this.props.placeholderText}
				defaultValue={ this.props.defaultValue }
				onChange={ this.props.onChange }
				onFocus={ this.props.onFocus }
				onKeyDown={ this.props.onKeyDown } />
		);
	}
} );
