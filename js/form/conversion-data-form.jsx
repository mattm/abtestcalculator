'use strict';

/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */
var config = require( '../config' ),
	ConversionDataInput = require( './conversion-data-input' ),
	utils = require( '../utils' );

module.exports = React.createClass( {
	handleFormSubmit: function( event ) {
		event.preventDefault();
		this.updateGraphs();
	},

	updateGraphs: function() {

		// TODO: Is there an elegant way to pass these integer strings and have them treated as integers?
		var nameA = this.refs.nameA.getDOMNode().innerHTML,
			nameB = this.refs.nameB.getDOMNode().innerHTML,
			participantsA = utils.integerStringToInteger( this.refs.participantsA.getDOMNode().value ),
			conversionsA = utils.integerStringToInteger( this.refs.conversionsA.getDOMNode().value ),
			participantsB = utils.integerStringToInteger( this.refs.participantsB.getDOMNode().value ),
			conversionsB = utils.integerStringToInteger( this.refs.conversionsB.getDOMNode().value );

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

		this.refs.nameA.getDOMNode().innerHTML = config.variations.a.defaultName;
		this.refs.nameB.getDOMNode().innerHTML = config.variations.b.defaultName;
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
					<ConversionDataInput
						placeholderText="Participants A"
						defaultValue={ this.props.variations.a.participants }
						ref="participantsA"
						onChange={ this.handleFormSubmit }
						onFocus={ this.setFocus }
						onKeyDown={ this.adjustInputValue } />
					<span className="arrow">&#9654;</span>
					<ConversionDataInput
						placeholderText="Conversions A"
						defaultValue={ this.props.variations.a.conversions }
						ref="conversionsA"
						onChange={ this.handleFormSubmit }
						onFocus={ this.setFocus }
						onKeyDown={ this.adjustInputValue } />
				</div>
				<div className="variation">
					<span className="label">
						<a href="#" className="variation-b" ref="nameB" onClick={ this.setVariationName }>{ this.props.variations.b.name }</a>
					</span>
					<ConversionDataInput
						placeholderText="Participants B"
						defaultValue={ this.props.variations.b.participants }
						ref="participantsB"
						onChange={ this.handleFormSubmit }
						onFocus={ this.setFocus }
						onKeyDown={ this.adjustInputValue } />
						<span className="arrow">&#9654;</span>
					<ConversionDataInput
						placeholderText="Conversions B"
						defaultValue={ this.props.variations.b.conversions }
						ref="conversionsB"
						onChange={ this.handleFormSubmit }
						onFocus={ this.setFocus }
						onKeyDown={ this.adjustInputValue } />
					<a href="#" className="reset" onClick={ this.resetForm }>reset form</a>
				</div>
			</form>
		);
	}
} );
