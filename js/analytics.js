'use strict';

module.exports = {
	recordEvent: function( eventName, eventProps ) {
		if ( eventProps === undefined ) {
			eventProps = {};
		}

		if ( this.isProduction() ) {
			mixpanel.track( eventName, eventProps );
		} else {
			console.log( 'Record Event: ' + eventName + ' with props ' + JSON.stringify( eventProps ) );
		}
	},

	isProduction: function() {
		return document.domain === 'www.abtestcalculator.com';
	}
};
