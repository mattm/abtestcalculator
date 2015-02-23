'use strict';

class Rectangle {
	constructor( x, y, width, height ) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
}

Object.defineProperties( Rectangle.prototype, {
	'bottom': {
		get: function() {
			return this.y + this.height;
		}
	},
	'right': {
		get: function() {
			return this.x + this.width;
		}
	}
} );

module.exports = Rectangle;
