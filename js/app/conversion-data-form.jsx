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
				<div>
					<input type="text" ref="participantsA" defaultValue={ this.props.participantsA } />
					<input type="text" ref="conversionsA" defaultValue={ this.props.conversionsA } />
				</div>
				<div>
					<input type="text" ref="participantsB" defaultValue={ this.props.participantsB } />
					<input type="text" ref="conversionsB" defaultValue={ this.props.conversionsB } />
				</div>
				<div>
					<button onClick={ this.handleFormSubmit }>Calculate</button>
				</div>
			</form>
		);
	}
} );
