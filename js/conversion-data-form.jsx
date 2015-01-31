'use strict';

/**
 * External dependencies
 */
var React = require( 'react' );

module.exports = React.createClass( {
	handleFormSubmit: function( event ) {
		event.preventDefault();
		this.updateGraphs();
	},

	updateGraphs: function() {
		var participantsA = this.refs.participantsA.getDOMNode().value,
			conversionsA = this.refs.conversionsA.getDOMNode().value,
			participantsB = this.refs.participantsB.getDOMNode().value,
			conversionsB = this.refs.conversionsB.getDOMNode().value,
			pattern = /^\d+$/;

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

	adjustInputValue: function( event ) {
		if ( event.keyCode === 38 ) {
			event.target.value = parseInt( event.target.value ) + 1;
			this.updateGraphs()
			event.preventDefault();
		} else if ( event.keyCode === 40 ) {
			if ( parseInt( event.target.value ) > 0 ) {
				event.target.value = parseInt( event.target.value ) - 1;
				this.updateGraphs();
				event.preventDefault();
			}
		}
	},

	// Prevent the cursor position from jumping to the beginning of the input field
	preventUpDownDefaults: function( event ) {
		if ( event.keyCode === 38 || event.keyCode === 40 ) {
			event.preventDefault();
		}
	},

	componentDidMount: function() {
		this.refs.participantsA.getDOMNode().focus()
	},

	render: function() {
		return (
			<form onSubmit={ this.handleFormSubmit }>
				<div className="header-row">
					<span className="participants">Participants</span>
					<span className="conversions">Conversions</span>
				</div>
				<div className="variation">
					<span className="label variation-a">Variation A</span>
					<input
						type="text"
						ref="participantsA"
						placeholder="Participants A"
						defaultValue={ this.props.variations.a.participants }
						onChange={ this.handleFormSubmit }
						onFocus={ this.setFocus }
						onKeyDown={ this.adjustInputValue } />
					<span className="arrow">&#9654;</span>
					<input
						type="text"
						ref="conversionsA"
						placeholder="Conversions A"
						defaultValue={ this.props.variations.a.conversions }
						onChange={ this.handleFormSubmit }
						onKeyDown={ this.adjustInputValue } />
				</div>
				<div className="variation">
					<span className="label variation-b">Variation B</span>
					<input type="text"
						ref="participantsB"
						placeholder="Participants B"
						defaultValue={ this.props.variations.b.participants }
						onChange={ this.handleFormSubmit }
						onKeyDown={ this.adjustInputValue } />
						<span className="arrow">&#9654;</span>
					<input
						type="text"
						ref="conversionsB"
						placeholder="Conversions B"
						defaultValue={ this.props.variations.b.conversions }
						onChange={ this.handleFormSubmit }
						onKeyDown={ this.adjustInputValue } />
				</div>
			</form>
		);
	}
} );
