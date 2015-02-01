'use strict';

/**
 * Internal dependencies
 */
var Range = require( './range' );

function NormalDistribution( mean, sd ) {
	this.mean = mean;
	this.sd = sd;
}

NormalDistribution.prototype = {
	SD_TO_GRAPH: 4,
	POINTS_PER_CURVE: 1000,
	Z_SCORE: 1.645,

	getX: function( z ) {
		return this.mean + z * this.sd;
	},

	getRange: function( z ) {
		return new Range( this.getX( -z ), this.getX( z ) );
	},

	getYAxisRange: function() {
		return new Range( 0, this.getDensity( this.mean ) );
	},

	// See: See: http://en.wikipedia.org/wiki/Normal_distribution
	getDensity: function( x ) {
		var a = 1 / ( this.sd * Math.sqrt( 2 * Math.PI ) ),
			b = Math.exp( -( Math.pow( x - this.mean, 2) ) / ( 2 * Math.pow( this.sd, 2 ) ) );

		return a * b;
	},

	getPeakDensity: function() {
		return this.getDensity( this.mean );
	},

	getCurveXValues: function() {
		var xRange = this.xRange,
			range = new Range( xRange.min, xRange.max, this.POINTS_PER_CURVE );

		return range.getValues();
	},

	getCurveYValues: function() {
		return this.xValues.map( function( xValue ) {
			return this.getDensity( xValue );
		}, this );
	},

	getXBetween: function( minExclusive, maxInclusive ) {
		return this.xValues.filter( function( xValue ) {
			return xValue > minExclusive && xValue <= maxInclusive;
		} );
	},

	getYForXBetween: function( minExclusive, maxInclusive ) {
		var xValues = this.getXBetween( minExclusive, maxInclusive );
		return xValues.map( function( xValue ) {
			return this.getDensity( xValue );
		}, this );
	},

	getConfidenceInterval: function() {
		return this.getRange( this.Z_SCORE );
	}
};

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
				var range = new Range( this.xRange.min, this.xRange.max, this.POINTS_PER_CURVE );
				this._xValues = range.getValues();
			}
			return this._xValues;
		}
	},
	'yValues': {
		get: function() {
			if ( this._yValues === undefined ) {
				var yValues = [];
				for ( var i = 0, l = this.xValues.length; i < l; i++ ) {
					yValues.push( this.getDensity( this.xValues[ i ] ) );
				}
				this._yValues = yValues;
			}
			return this._yValues;
		}
	}
} );

module.exports = NormalDistribution;
