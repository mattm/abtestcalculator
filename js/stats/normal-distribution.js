'use strict';

/**
 * Internal dependencies
 */
let NumberRange = require( './number-range' );

class NormalDistribution {
	constructor( mean, sd ) {
		this.mean = mean;
		this.sd = sd;
	}

	getX( z ) {
		return this.mean + z * this.sd;
	}

	getRange( z ) {
		return new NumberRange( this.getX( -z ), this.getX( z ) );
	}

	getYAxisRange() {
		return new NumberRange( 0, this.getDensity( this.mean ) );
	}

	// See: See: http://en.wikipedia.org/wiki/Normal_distribution
	getDensity( x ) {
		let a = 1 / ( this.sd * Math.sqrt( 2 * Math.PI ) ),
			b = Math.exp( -( Math.pow( x - this.mean, 2) ) / ( 2 * Math.pow( this.sd, 2 ) ) );

		return a * b;
	}

	getPeakDensity() {
		return this.getDensity( this.mean );
	}

	getCurveXValues() {
		let xRange = this.xRange,
			range = new NumberRange( xRange.min, xRange.max, this.POINTS_PER_CURVE );

		return range.getValues();
	}

	getCurveYValues() {
		return this.xValues.map( function( xValue ) {
			return this.getDensity( xValue );
		}, this );
	}

	getXBetween( minExclusive, maxInclusive ) {
		return this.xValues.filter( function( xValue ) {
			return xValue > minExclusive && xValue <= maxInclusive;
		} );
	}

	getYForXBetween( minExclusive, maxInclusive ) {
		let xValues = this.getXBetween( minExclusive, maxInclusive );
		return xValues.map( function( xValue ) {
			return this.getDensity( xValue );
		}, this );
	}
}

Object.defineProperties( NormalDistribution.prototype, {
	'variance': {
		get: function() {
			return Math.pow( this.sd, 2 );
		}
	},
	'xRange': {
		get: function() {
			if ( this._xRange === undefined ) {
				this._xRange = this.getRange( this.SD_TO_GRAPH );
			}
			return this._xRange;
		}
	},
	'xValues': {
		get: function() {
			if ( this._xValues === undefined ) {
				let range = new NumberRange( this.xRange.min, this.xRange.max, this.POINTS_PER_CURVE );
				this._xValues = range.getValues();
			}
			return this._xValues;
		}
	},
	'yValues': {
		get: function() {
			if ( this._yValues === undefined ) {
				this._yValues = this.xValues.map( function( xValue ) {
					return this.getDensity( xValue );
				}, this );
			}
			return this._yValues;
		}
	}
} );

NormalDistribution.prototype.SD_TO_GRAPH = 4;
NormalDistribution.prototype.POINTS_PER_CURVE = 1000;

module.exports = NormalDistribution;
