'use strict';

class NumberRange {
	constructor( min, max, n ) {
		if ( n === void 0 ) {
			n = 2;
		}

		// throw 'The min and max must be numbers' if isNaN(@min) or ! _.isNumber(@min) or isNaN(@max) or ! _.isNumber(@max)
		if ( n < 2 ) {
			throw 'The range must include at least 2 values, a min and max';
		}

		if ( max < min ) {
			throw 'The max (' + max + ') must be greater than the min (' + min + ')';
		}

		this.min = min;
		this.max = max;
		this.n = n;
	}

	getValues() {
		let separation = ( this.max - this.min ) / ( this.n - 1 ),
			values = [];

		for( let i = 0, l = this.n - 1; i < l; i++ ) {
			values.push( this.min + separation * i );
		}

		return values;
	}

	getWidth() {
		return this.max - this.min;
	}
}

module.exports = NumberRange;
