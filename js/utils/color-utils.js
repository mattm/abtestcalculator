'use strict';

module.exports = {
	hexToRGB: function( hex ) {
		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
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
		let rgb = this.hexToRGB( hex );
		return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + opacity + ')';
	}
};
