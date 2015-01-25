'use strict';

/**
 * External dependencies
 */
var React = require( 'react' );

module.exports = React.createClass( {
	handleFormSubmit: function( event ) {
		var participantsA = this.refs.participantsA.getDOMNode().value,
			conversionsA = this.refs.conversionsA.getDOMNode().value,
			participantsB = this.refs.participantsB.getDOMNode().value,
			conversionsB = this.refs.conversionsB.getDOMNode().value,
			pattern = /^\d+$/;

		event.preventDefault();

		participantsA = pattern.test( participantsA ) ? +participantsA : participantsA;
		conversionsA = pattern.test( conversionsA ) ? +conversionsA : conversionsA;
		participantsB = pattern.test( participantsB ) ? +participantsB : participantsB;
		conversionsB = pattern.test( conversionsB ) ? +conversionsB : conversionsB;

		this.props.onUpdate( participantsA, conversionsA, participantsB, conversionsB );
	},

	// Hack to place cursor at end of input field on page load
	// See: http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
	setFocus: function( event ) {
		event.target.value = event.target.value;
	},

	componentDidMount: function() {
		this.refs.participantsA.getDOMNode().focus()
	},

	render: function() {
		return (
			<form onSubmit={ this.handleFormSubmit }>
				<div className="variation">
					<span>Variation A</span>
					<input type="text" ref="participantsA" placeholder="Participants A" defaultValue={ this.props.variations.a.participants } onChange={ this.handleFormSubmit } onFocus={ this.setFocus } />
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
