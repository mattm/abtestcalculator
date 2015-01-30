'use strict';

/**
 * Internal dependencies
 */
var NormalDifferenceDistribution = require( './normal-difference-distribution' );

module.exports = {
	getPixelRatio: function() {
		var context = document.createElement( 'canvas' ).getContext( '2d' ),
			dpr = window.devicePixelRatio || 1,
			bsr = context.webkitBackingStorePixelRatio ||
				context.mozBackingStorePixelRatio ||
				context.msBackingStorePixelRatio ||
				context.oBackingStorePixelRatio ||
				context.backingStorePixelRatio || 1;
		return dpr / bsr;
	},

	hexToRgb: function( hex ) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
		if ( result ) {
			return {
				r: parseInt( result[1], 16 ),
				g: parseInt( result[2], 16 ),
				b: parseInt( result[3], 16 )
			};
		} else {
			return null;
		}
	},

	hexToTransparentRGB: function( hex, opacity ) {
		var rgb = this.hexToRgb( hex );
		return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + opacity + ")";
	},

	isCanvasSupported: function() {
		var element = document.createElement( 'canvas' );
		return !!( element.getContext && element.getContext( '2d' ) );
	},

	isInteger: function( string ) {
		return /^\d+$/.test( string );
	},

	ratioToPercentage: function( ratio ) {
		return ( ratio * 100 ) + '%';
	},

	formatPercentageImprovement: function( percentage ) {
		var sign = percentage > 0 ? '+' : '';
		return sign + percentage + '%';
	},

	// See: http://blog.42floors.com/math-split-testing-part-2-chance-better/
	calculateProbabityBIsGratherThanA: function( proportionA, proportionB ) {
		var normalDifferenceDistribution = new NormalDifferenceDistribution( proportionA, proportionB );
		var z = ( proportionB.mean - proportionA.mean ) / ( normalDifferenceDistribution.sd * Math.sqrt(2) );
		return ( 1 + this.erf( z ) ) / 2;
	},

	// Adapted from http://picomath.org/javascript/erf.js.html
	erf: function( x ) {
		var a1 = 0.254829592;
		var a2 = -0.284496736;
		var a3 = 1.421413741;
		var a4 = -1.453152027;
		var a5 = 1.061405429;
		var p = 0.3275911;

		var sign = x < 0 ? -1 : 1;
		x = Math.abs( x );

		var t = 1 / (1 + p * x);
		var y = 1 - ( ( ( ( ( a5 * t + a4 ) * t ) + a3 ) * t + a2 ) * t + a1 ) * t * Math.exp( -x * x );

		return sign * y;
	}
};
