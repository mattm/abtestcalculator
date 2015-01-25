'use strict';

/**
 * External dependencies
 */
var React = require( 'react' );

module.exports = React.createClass( {
	handleFormSubmit: function( event ) {
		event.preventDefault();

		this.props.onUpdate(
			this.refs.participantsA.getDOMNode().value,
			this.refs.conversionsA.getDOMNode().value,
			this.refs.participantsB.getDOMNode().value,
			this.refs.conversionsB.getDOMNode().value
		);
	},

	render: function() {
		return (
			<form onSubmit={ this.handleFormSubmit }>
				<div className="variation">
					<span>Variation A</span>
					<input type="text" ref="participantsA" placeholder="Participants A" defaultValue={ this.props.variations.a.participants } onChange={ this.handleFormSubmit } />
					<input type="text" ref="conversionsA" placeholder="Conversions A" defaultValue={ this.props.variations.a.conversions } onChange={ this.handleFormSubmit } />
				</div>
				<div className="variation">
					<span>Variation B</span>
					<input type="text" ref="participantsB" placeholder="Participants B" defaultValue={ this.props.variations.b.participants } onChange={ this.handleFormSubmit } />
					<input type="text" ref="conversionsB" placeholder="Conversions B" defaultValue={ this.props.variations.b.conversions } onChange={ this.handleFormSubmit } />
				</div>
			</form>
		);
	}
} );
