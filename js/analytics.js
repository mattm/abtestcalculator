'use strict';

module.exports = {
	recordEvent: function( eventName ) {
		if ( this.isProduction() ) {
			mixpanel.track( eventName );
		} else {
			console.log( 'Record Event: ' + eventName );
		}
	},

	isProduction: function() {
		return document.domain === 'www.abtestcalculator.com';
	}
};
