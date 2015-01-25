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

		if ( pattern.test( participantsA ) ) {
			participantsA = +participantsA;
		}

		if ( pattern.test( conversionsA ) ) {
			conversionsA = +conversionsA;
		}

		if ( pattern.test( participantsB ) ) {
			participantsB = +participantsB;
		}

		if ( pattern.test( conversionsB ) ) {
			conversionsB = +conversionsB;
		}

		this.props.onUpdate( participantsA, conversionsA, participantsB, conversionsB );
	},

	componentDidMount: function() {
		this.refs.participantsA.getDOMNode().focus()
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
