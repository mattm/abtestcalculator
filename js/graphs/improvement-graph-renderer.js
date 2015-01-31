'use strict';

/**
 * External dependencies
 */
var numeral = require( 'numeral' ),
	_ = require( 'lodash' );

/**
 * Internal dependencies
 */
var GraphRenderer = require( './graph-renderer' ),
	NormalDifferenceDistribution = require( '../stats/normal-difference-distribution' ),
	Range = require( '../stats/range' ),
	Utils = require( '../utils' );

function ImprovementGraphRenderer( canvasId ) {
	GraphRenderer.call( this, canvasId );
}

ImprovementGraphRenderer.prototype = Object.create( GraphRenderer.prototype, {
	NEGATIVE_COLOR: {
		value: '#ff0000'
	},

	POSITIVE_COLOR: {
		value: '#22B722'
	},

	render: {
		value: function() {
			this.prepareForRender();
			this.renderCurve();
			this.renderCenter();
			GraphRenderer.prototype.render.call( this );
		}
	},

	renderCurve: {
		value: function() {
			this.renderNegativeCurvePart();
			this.renderPositiveCurvePart();
		}
	},

	renderCenter: {
		value: function() {
			this.ctx.beginPath();
			this.ctx.moveTo( this.distributionXToCanvasX( this.distribution.mean ), this.rect.bottom );
			this.ctx.lineTo( this.distributionXToCanvasX( this.distribution.mean ), this.distributionYToCanvasY( this.distribution.getPeakDensity() ) );
			this.ctx.closePath();
			this.ctx.lineWidth = 1;
			this.ctx.strokeStyle = this.getCenterLineColor();
			this.ctx.stroke();
		}
	},

	getCenterLineColor: {
		value: function() {
			var color = this.distribution.mean > 0 ? this.POSITIVE_COLOR : this.NEGATIVE_COLOR;
			return Utils.hexToTransparentRGB( color, 0.5 );
		}
	},

	prepareForRender: {
		value: function() {
			this.setDistribution();
			this.calculateAxisRanges();
		}
	},

	renderNegativeCurvePart: {
		value: function() {
			var range = new Range( -Infinity, 0 );
			this.xNegativeValues = this.distribution.getXBetween( range.min, range.max );
			this.yNegativeValues = this.distribution.getYForXBetween( range.min, range.max );
			this.renderCurvePart( this.xNegativeValues, this.yNegativeValues, this.NEGATIVE_COLOR );
		}
	},

	renderPositiveCurvePart: {
		value: function() {
			var range = new Range( 0, Infinity );
			var xValues = this.distribution.getXBetween( range.min, range.max );
			var yValues = this.distribution.getYForXBetween( range.min, range.max );

			// We add the last negative values to the beginning of the arrays to ensure there isn't
			// a thin white line separating the negative and positive sections of the curve
			xValues.unshift( this.xNegativeValues.slice(-1)[0] );
			yValues.unshift( this.yNegativeValues.slice(-1)[0] );

			this.renderCurvePart( xValues, yValues, this.POSITIVE_COLOR );
		}
	},

	renderCurvePart: {
		value: function( xValues, yValues, color ) {
			this.renderCurveFilled( xValues, yValues, color );
			this.renderCurveOutline( xValues, yValues, color );
		}
	},

	renderCurveFilled: {
		value: function( xValues, yValues, color ) {
			this.ctx.beginPath();
			this.ctx.moveTo( this.distributionXToCanvasX( _.min( xValues ) ), this.rect.bottom );
			for ( var i = 0, l = xValues.length; i < l; i++ ) {
				this.ctx.lineTo( this.distributionXToCanvasX( xValues[ i ] ), this.distributionYToCanvasY( yValues[ i ] ) );
			}
			this.ctx.lineTo( this.distributionXToCanvasX( _.max( xValues ) ), this.rect.bottom );
			this.ctx.closePath();
			this.ctx.fillStyle = Utils.hexToTransparentRGB( color, this.FILL_OPACITY );
			this.ctx.fill();
		}
	},

	renderCurveOutline: {
		value: function( xValues, yValues, color ) {
			this.ctx.beginPath();
			for ( var i = 0, l = xValues.length; i < l; i++ ) {
				this.ctx.lineTo( this.distributionXToCanvasX( xValues[ i ] ), this.distributionYToCanvasY( yValues[ i ] ) );
			}
			this.ctx.lineWidth = this.OUTLINE_LINE_WIDTH;
			this.ctx.strokeStyle = Utils.hexToTransparentRGB( color, this.OUTLINE_OPACITY );
			this.ctx.stroke();
		}
	},

	renderAxisValues: {
		value: function() {
			var numTicks, canvasY, points, value, canvasX;
			numTicks = this.xAxisRange.getWidth() / this.calculateXAxisInterval() + 1;
			canvasY = this.rect.bottom + this.X_AXIS_TICK_FONT_SIZE + this.X_AXIS_TICK_MARGIN_TOP;
			for ( var i = 0, l = numTicks; i < l; i++ ) {
				points = this.xAxisRange.min + i * this.calculateXAxisInterval();
				value = Utils.formatPercentageImprovement( this.convertPointsToPercentage( points ) );
				canvasX = this.rect.x + ( i / ( numTicks - 1 ) ) * this.rect.width;
				this.renderAxisTextWithTick( value, canvasX, canvasY );
			}
		}
	},

	convertPointsToPercentage: {
		value: function( points ) {
			var mean = this.getControl().proportion.mean;
			var ratio = (points + mean) / mean - 1;
			return Math.round( ratio * 100 );
		}
	},

	setDistribution: {
		value: function() {
			if ( this.variations.length !== 2 ) {
				throw 'Normal difference distribution only supports two variations';
			}
			this.distribution = new NormalDifferenceDistribution( this.getControl().proportion, this.getExperiment().proportion );
		}
	},

	calculateXAxisInterval: {
		value: function() {
			return this.distribution.xRange.getWidth() / 5;
		}
	},

	calculateXAxisRange: {
		value: function() {
			var interval = this.calculateXAxisInterval();
			this.xAxisRange = new Range( Math.floor(this.distribution.xRange.min / interval) * interval, Math.ceil(this.distribution.xRange.max / interval) * interval );
		}
	},

	calculateYAxisRange: {
		value: function() {
			this.yAxisRange = this.distribution.getYAxisRange();
		}
	}
} );

ImprovementGraphRenderer.prototype.constructor = ImprovementGraphRenderer;

module.exports = ImprovementGraphRenderer;
