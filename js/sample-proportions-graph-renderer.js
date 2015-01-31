'use strict';

/**
 * External dependencies
 */
var numeral = require( 'numeral' )

/**
 * Internal dependencies
 */
var GraphRenderer = require( './graph-renderer' ),
	Range = require( './stats/range' ),
	Utils = require( './utils' );

function SampleProportionsGraphRenderer( context ) {
	GraphRenderer.call( this, context );
}

SampleProportionsGraphRenderer.prototype = Object.create( GraphRenderer.prototype, {
	render: {
		value: function() {
			this.calculateAxisRanges();
			this.renderSampleProportions();
			GraphRenderer.prototype.render.call( this );
		}
	},

	calculateXAxisRange: {
		value: function() {
			var exactRange = this.calculateXAxisRangeExact();
			this.xAxisRange = new Range(
				Math.floor(exactRange.min / this.getXAxisInterval()) * this.getXAxisInterval(),
				Math.ceil(exactRange.max / this.getXAxisInterval()) * this.getXAxisInterval()
			);
		}
	},

	calculateXAxisRangeExact: {
		value: function() {
			var variation, xAxisRange, min, max;
			for ( var i = 0, l = this.variations.length; i < l; i++ ) {
				variation = this.variations[ i ];
				xAxisRange = variation.proportion.xRange;
				if ( min === undefined || xAxisRange.min < min ) {
					min = xAxisRange.min;
				}
				if ( max === undefined || xAxisRange.max > max ) {
					max = xAxisRange.max;
				}
			}
			return new Range( min, max );
		}
	},

	getXAxisInterval: {
		value: function() {
			var width = this.calculateXAxisRangeExact().getWidth();
			if ( width < 0.05 ) {
				return 0.01;
			} else if ( width < 0.3 ) {
				return 0.05;
			} else {
				return 0.10;
			}
		}
	},

	calculateYAxisRange: {
		value: function() {
			var variation, yAxisRange, max;
			for ( var i = 0, l = this.variations.length; i < l; i++ ) {
				yAxisRange = this.variations[ i ].proportion.getYAxisRange();
				if ( max === undefined || yAxisRange.max > max ) {
					max = yAxisRange.max;
				}
			}
			this.yAxisRange = new Range( 0, max );
		}
	},

	renderSampleProportions: {
		value: function() {
			for ( var i = 0, l = this.variations.length; i < l; i++ ) {
				this.renderSamplingDistribution( this.variations[ i ] );
			}
		}
	},

	renderSamplingDistribution: {
		value: function( variation ) {
			this.renderSampleDistributionFill( variation );
			this.renderSampleDistributionOutline( variation );
			this.renderCenter( variation );
		}
	},

	renderSampleDistributionOutline: {
		value: function( variation ) {
			this.ctx.lineWidth = this.OUTLINE_LINE_WIDTH;
			this.ctx.strokeStyle = Utils.hexToTransparentRGB( variation.color, this.OUTLINE_OPACITY );
			this.ctx.beginPath();
			this.ctx.moveTo( this.distributionXToCanvasX(variation.proportion.xRange.min), this.rect.bottom );
			for ( var i = 0, l = variation.proportion.xValues.length; i < l; i++ ) {
				this.ctx.lineTo( this.distributionXToCanvasX( variation.proportion.xValues[ i ] ), this.distributionYToCanvasY( variation.proportion.yValues[ i ] ) );
			}
			this.ctx.stroke();
		}
	},

	renderSampleDistributionFill: {
		value: function( variation ) {
			this.ctx.beginPath();
			this.ctx.moveTo( this.distributionXToCanvasX(variation.proportion.xRange.min), this.rect.bottom );
			for ( var i = 0, l = variation.proportion.xValues.length; i < l; i++ ) {
				this.ctx.lineTo( this.distributionXToCanvasX( variation.proportion.xValues[ i ] ), this.distributionYToCanvasY( variation.proportion.yValues[ i ] ) );
			}
			this.ctx.closePath();
			this.ctx.fillStyle = Utils.hexToTransparentRGB( variation.color, this.FILL_OPACITY );
			this.ctx.fill();
		}
	},

	renderCenter: {
		value: function( variation ) {
			this.ctx.beginPath();
			this.ctx.moveTo( this.distributionXToCanvasX( variation.proportion.mean ), this.rect.bottom );
			this.ctx.lineTo( this.distributionXToCanvasX( variation.proportion.mean ), this.distributionYToCanvasY( variation.proportion.getPeakDensity() ) );
			this.ctx.closePath();
			this.ctx.lineWidth = 1;
			this.ctx.strokeStyle = Utils.hexToTransparentRGB( variation.color, 0.5 );
			this.ctx.stroke();
		}
	},

	renderAxisValues: {
		value: function() {
			var numTicks, canvasY, proportion, percentage, canvasX;
			numTicks = this.xAxisRange.getWidth() / this.getXAxisInterval() + 1;
			canvasY = this.rect.bottom + this.X_AXIS_TICK_FONT_SIZE + this.X_AXIS_TICK_MARGIN_TOP;
			for ( var i = 0, l = numTicks; i < l; i++ ) {
				proportion = this.xAxisRange.min + i * this.getXAxisInterval();
				percentage = numeral( proportion ).format( '0%' );
				canvasX = this.rect.x + ( i / ( numTicks - 1 ) ) * this.rect.width;
				this.renderAxisTextWithTick( percentage, canvasX, canvasY );
			}
		}
	}
} );

SampleProportionsGraphRenderer.prototype.constructor = SampleProportionsGraphRenderer;

module.exports = SampleProportionsGraphRenderer;
