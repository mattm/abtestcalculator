'use strict';

/**
 * External dependencies
 */
var React = require( 'react' );

/**
 * Internal dependencies
 */
var config = require( '../config' ),
	constants = require( '../constants' ),
	ConversionDataInput = require( './conversion-data-input' ),
	utils = require( '../utils' );

module.exports = React.createClass( {
	componentDidMount: function() {
		this.refs.participantsA.getDOMNode().focus();
	},

	handleFormSubmit: function( event ) {
		event.preventDefault();
		this.updateGraphs();
	},

	// Hack to place cursor at end of input field on page load
	// See: http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
	handleFocus: function( event ) {
		event.target.value = event.target.value;
	},

	handleKeyDown: function( event ) {
		var currentValue = parseInt( event.target.value );

		if ( event.keyCode === constants.KEY_UP ) {
			event.target.value = currentValue + 1;
			this.updateGraphs();
			event.preventDefault();
		} else if ( event.keyCode === constants.KEY_DOWN && currentValue > 0 ) {
			event.target.value = currentValue - 1;
			this.updateGraphs();
			event.preventDefault();
		}
	},

	// TODO: Is there an elegant way to pass these integer strings and have them treated as integers?
	updateGraphs: function() {
		this.props.onUpdate( {
			nameA: this.refs.nameA.getDOMNode().innerHTML,
			nameB: this.refs.nameB.getDOMNode().innerHTML,
			participantsA: utils.integerStringToInteger( this.refs.participantsA.getDOMNode().value ),
			conversionsA: utils.integerStringToInteger( this.refs.conversionsA.getDOMNode().value ),
			participantsB: utils.integerStringToInteger( this.refs.participantsB.getDOMNode().value ),
			conversionsB: utils.integerStringToInteger( this.refs.conversionsB.getDOMNode().value ),
		} );
	},

	setVariationName: function( event ) {
		event.preventDefault();

		var newName = prompt( "What would you like to call this variation?", event.target.innerHTML );

		if ( newName ) {
			event.target.innerHTML = newName;
			this.updateGraphs();
		}
	},

	// Prevent the cursor position from jumping to the beginning of the input field
	preventUpDownDefaults: function( event ) {
		if ( event.keyCode === constants.KEY_UP || event.keyCode === constants.KEY_DOWN ) {
			event.preventDefault();
		}
	},

	resetForm: function( event ) {
		event.preventDefault();

		this.props.onUpdate( {
			nameA: config.variations.a.defaultName,
			nameB: config.variations.b.defaultName,
			participantsA: '',
			conversionsA: '',
			participantsB: '',
			conversionsB: ''
		} );
	},

	conversionArrow: function() {
		return <span className="arrow">&#9654;</span>;
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
						value={ this.props.variations.a.participants }
						ref="participantsA"
						onChange={ this.updateGraphs }
						onFocus={ this.handleFocus }
						onKeyDown={ this.handleKeyDown } />
					{ this.conversionArrow() }
					<ConversionDataInput
						placeholderText="Conversions A"
						value={ this.props.variations.a.conversions }
						ref="conversionsA"
						onChange={ this.updateGraphs }
						onKeyDown={ this.handleKeyDown } />
				</div>
				<div className="variation">
					<span className="label">
						<a href="#" className="variation-b" ref="nameB" onClick={ this.setVariationName }>{ this.props.variations.b.name }</a>
					</span>
					<ConversionDataInput
						placeholderText="Participants B"
						value={ this.props.variations.b.participants }
						ref="participantsB"
						onChange={ this.updateGraphs }
						onKeyDown={ this.handleKeyDown } />
					{ this.conversionArrow() }
					<ConversionDataInput
						placeholderText="Conversions B"
						value={ this.props.variations.b.conversions }
						ref="conversionsB"
						onChange={ this.updateGraphs }
						onKeyDown={ this.handleKeyDown } />
					<a href="#" className="reset" onClick={ this.resetForm }>reset form</a>
				</div>
			</form>
		);
	}
} );
