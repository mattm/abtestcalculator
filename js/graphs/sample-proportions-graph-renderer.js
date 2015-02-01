'use strict';

/**
 * External dependencies
 */
var numeral = require( 'numeral' )

/**
 * Internal dependencies
 */
var colorUtils = require( '../utils/color-utils' ),
	GraphRenderer = require( './graph-renderer' ),
	Range = require( '../stats/range' );

function SampleProportionsGraphRenderer( context ) {
	GraphRenderer.call( this, context );
}

SampleProportionsGraphRenderer.prototype = Object.create( GraphRenderer.prototype );
SampleProportionsGraphRenderer.prototype.constructor = SampleProportionsGraphRenderer;

SampleProportionsGraphRenderer.prototype.render = function() {
	this.calculateAxisRanges();
	this.renderSampleProportions();
	GraphRenderer.prototype.render.call( this );
};

SampleProportionsGraphRenderer.prototype.calculateXAxisRange = function() {
	var exactRange = this.calculateXAxisRangeExact();

	this.xAxisRange = new Range(
		Math.floor( exactRange.min / this.getXAxisInterval() ) * this.getXAxisInterval(),
		Math.ceil( exactRange.max / this.getXAxisInterval() ) * this.getXAxisInterval()
	);
};

SampleProportionsGraphRenderer.prototype.calculateXAxisRangeExact = function() {
	var xAxisRange, min, max;

	this.variations.forEach( function( variation ) {
		xAxisRange = variation.proportion.xRange;
		if ( min === undefined || xAxisRange.min < min ) {
			min = xAxisRange.min;
		}
		if ( max === undefined || xAxisRange.max > max ) {
			max = xAxisRange.max;
		}
	} );
	return new Range( min, max );
};

SampleProportionsGraphRenderer.prototype.getXAxisInterval = function() {
	var width = this.calculateXAxisRangeExact().getWidth();

	if ( width < 0.05 ) {
		return 0.01;
	} else if ( width < 0.3 ) {
		return 0.05;
	} else {
		return 0.10;
	}
};

SampleProportionsGraphRenderer.prototype.calculateYAxisRange = function() {
	var yAxisRange, max;

	this.variations.forEach( function( variation ) {
		yAxisRange = variation.proportion.getYAxisRange();
		if ( max === undefined || yAxisRange.max > max ) {
			max = yAxisRange.max;
		}
	} );
	this.yAxisRange = new Range( 0, max );
};

SampleProportionsGraphRenderer.prototype.renderSampleProportions = function() {
	this.variations.forEach( function ( variation ) {
		this.renderSamplingDistribution( variation );
	}, this );
};

SampleProportionsGraphRenderer.prototype.renderSamplingDistribution = function( variation ) {
	this.renderSampleDistributionFill( variation );
	this.renderSampleDistributionOutline( variation );
	this.renderCenter( variation );
};

SampleProportionsGraphRenderer.prototype.renderSampleDistributionOutline = function( variation ) {
	this.ctx.lineWidth = this.OUTLINE_LINE_WIDTH;
	this.ctx.strokeStyle = colorUtils.hexToTransparentRGB( variation.color, this.OUTLINE_OPACITY );
	this.ctx.beginPath();
	this.ctx.moveTo( this.distributionXToCanvasX( variation.proportion.xRange.min), this.rect.bottom );
	variation.proportion.xValues.forEach( function( xValue, i ) {
		this.ctx.lineTo( this.distributionXToCanvasX( xValue ), this.distributionYToCanvasY( variation.proportion.yValues[ i ] ) );
	}, this );
	this.ctx.stroke();
};

SampleProportionsGraphRenderer.prototype.renderSampleDistributionFill = function( variation ) {
	var i, l;

	this.ctx.beginPath();
	this.ctx.moveTo( this.distributionXToCanvasX( variation.proportion.xRange.min), this.rect.bottom );
	variation.proportion.xValues.forEach( function( xValue, i ) {
		this.ctx.lineTo( this.distributionXToCanvasX( xValue ), this.distributionYToCanvasY( variation.proportion.yValues[ i ] ) );
	}, this );
	this.ctx.closePath();
	this.ctx.fillStyle = colorUtils.hexToTransparentRGB( variation.color, this.FILL_OPACITY );
	this.ctx.fill();
};

SampleProportionsGraphRenderer.prototype.renderCenter = function( variation ) {
	this.ctx.beginPath();
	this.ctx.moveTo( this.distributionXToCanvasX( variation.proportion.mean ), this.rect.bottom );
	this.ctx.lineTo( this.distributionXToCanvasX( variation.proportion.mean ), this.distributionYToCanvasY( variation.proportion.getPeakDensity() ) );
	this.ctx.closePath();
	this.ctx.lineWidth = 1;
	this.ctx.strokeStyle = colorUtils.hexToTransparentRGB( variation.color, 0.5 );
	this.ctx.stroke();
};

SampleProportionsGraphRenderer.prototype.renderAxisValues = function() {
	var numTicks, canvasY, i, l, proportion, percentage, canvasX;

	numTicks = this.xAxisRange.getWidth() / this.getXAxisInterval() + 1;
	canvasY = this.rect.bottom + this.X_AXIS_TICK_FONT_SIZE + this.X_AXIS_TICK_MARGIN_TOP;
	for ( i = 0, l = numTicks; i < l; i++ ) {
		proportion = this.xAxisRange.min + i * this.getXAxisInterval();
		percentage = numeral( proportion ).format( '0%' );
		canvasX = this.rect.x + ( i / ( numTicks - 1 ) ) * this.rect.width;
		this.renderAxisTextWithTick( percentage, canvasX, canvasY );
	}
};

module.exports = SampleProportionsGraphRenderer;
