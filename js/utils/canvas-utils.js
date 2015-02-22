'use strict';

module.exports = {
	getPixelRatio: function() {
		let context = document.createElement( 'canvas' ).getContext( '2d' ),
			dpr = window.devicePixelRatio || 1,
			bsr = context.webkitBackingStorePixelRatio ||
				context.mozBackingStorePixelRatio ||
				context.msBackingStorePixelRatio ||
				context.oBackingStorePixelRatio ||
				context.backingStorePixelRatio || 1;
		return dpr / bsr;
	},

	isCanvasSupported: function() {
		let element = document.createElement( 'canvas' );
		return !!( element.getContext && element.getContext( '2d' ) );
	}
};
