// define( function() {

// 	// See: http://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas



// 	return {
// 		create: function( id, w, h ) {
// 			ratio = getPixelRatio();
// 			canvas = document.createElement( 'canvas' );
// 			canvas.width = w * ratio;
// 			canvas.height = h * ratio;
// 			canvas.style.width = w + 'px';
// 			canvas.style.height = h + 'px';
// 			canvas.setAttribute( 'id', id );
// 			canvas.getContext('2d').setTransform( ratio, 0, 0, ratio, 0, 0 );
// 			return canvas;
// 		}
// 	};
// } );