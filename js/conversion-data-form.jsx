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
		var nameA = this.refs.nameA.getDOMNode().innerHTML,
			nameB = this.refs.nameB.getDOMNode().innerHTML,
			participantsA = this.refs.participantsA.getDOMNode().value,
			conversionsA = this.refs.conversionsA.getDOMNode().value,
			participantsB = this.refs.participantsB.getDOMNode().value,
			conversionsB = this.refs.conversionsB.getDOMNode().value,
			pattern = /^\d+$/;

		participantsA = pattern.test( participantsA ) ? +participantsA : participantsA;
		conversionsA = pattern.test( conversionsA ) ? +conversionsA : conversionsA;
		participantsB = pattern.test( participantsB ) ? +participantsB : participantsB;
		conversionsB = pattern.test( conversionsB ) ? +conversionsB : conversionsB;

		this.props.onUpdate( nameA, nameB, participantsA, conversionsA, participantsB, conversionsB );
	},

	setVariationName: function( event ) {
		var newName = prompt( "What would you like to call this variation?", event.target.innerHTML );

		event.preventDefault();

		if ( newName ) {
			event.target.innerHTML = newName;
			this.updateGraphs();
		}
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

	resetForm: function( event ) {
		event.preventDefault();

		this.refs.participantsA.getDOMNode().value = '';
		this.refs.conversionsA.getDOMNode().value = '';
		this.refs.participantsB.getDOMNode().value = '';
		this.refs.conversionsB.getDOMNode().value = '';
		this.updateGraphs();
	},

	render: function() {
		return (
			<form onSubmit={ this.handleFormSubmit }>
				<div className="header-row">
					<span className="participants">Participants</span>
					<span className="conversions">Conversions</span>
				</div>
				<div className="variation">
					<span className="label">
						<a href="#" className="variation-a" ref="nameA" onClick={ this.setVariationName }>{ this.props.variations.a.name }</a>
					</span>
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
					<span className="label">
						<a href="#" className="variation-b" ref="nameB" onClick={ this.setVariationName }>{ this.props.variations.b.name }</a>
					</span>
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
					<a href="#" className="reset" onClick={ this.resetForm }>reset form</a>
				</div>
			</form>
		);
	}
} );
