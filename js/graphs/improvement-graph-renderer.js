'use strict';

/**
 * External dependencies
 */
var numeral = require( 'numeral' ),
	_ = require( 'lodash' );

/**
 * Internal dependencies
 */
var colorUtils = require( '../utils/color-utils' ),
	GraphRenderer = require( './graph-renderer' ),
	NormalDifferenceDistribution = require( '../stats/normal-difference-distribution' ),
	Range = require( '../stats/range' ),
	utils = require( '../utils' );

function ImprovementGraphRenderer( canvasId ) {
	GraphRenderer.call( this, canvasId );
}

ImprovementGraphRenderer.prototype = Object.create( GraphRenderer.prototype );
ImprovementGraphRenderer.prototype.constructor = ImprovementGraphRenderer;

ImprovementGraphRenderer.prototype.NEGATIVE_COLOR = '#ff0000';
ImprovementGraphRenderer.prototype.POSITIVE_COLOR = '#22B722';

ImprovementGraphRenderer.prototype.render = function() {
	this.prepareForRender();
	this.renderCurve();
	this.renderCenter();
	GraphRenderer.prototype.render.call( this );
};

ImprovementGraphRenderer.prototype.renderCurve = function() {
	this.renderNegativeCurvePart();
	this.renderPositiveCurvePart();
};

ImprovementGraphRenderer.prototype.renderCenter = function() {
	this.ctx.beginPath();
	this.ctx.moveTo( this.distributionXToCanvasX( this.distribution.mean ), this.rect.bottom );
	this.ctx.lineTo( this.distributionXToCanvasX( this.distribution.mean ), this.distributionYToCanvasY( this.distribution.getPeakDensity() ) );
	this.ctx.closePath();
	this.ctx.lineWidth = 1;
	this.ctx.strokeStyle = this.getCenterLineColor();
	this.ctx.stroke();
};

ImprovementGraphRenderer.prototype.getCenterLineColor = function() {
	var color = this.distribution.mean > 0 ? this.POSITIVE_COLOR : this.NEGATIVE_COLOR;
	return colorUtils.hexToTransparentRGB( color, 0.5 );
};

ImprovementGraphRenderer.prototype.prepareForRender = function() {
	this.setDistribution();
	this.calculateAxisRanges();
};

ImprovementGraphRenderer.prototype.renderNegativeCurvePart = function() {
	var range = new Range( -Infinity, 0 );
	this.xNegativeValues = this.distribution.getXBetween( range.min, range.max );
	this.yNegativeValues = this.distribution.getYForXBetween( range.min, range.max );
	this.renderCurvePart( this.xNegativeValues, this.yNegativeValues, this.NEGATIVE_COLOR );
};

ImprovementGraphRenderer.prototype.renderPositiveCurvePart = function() {
	var range = new Range( 0, Infinity );
	var xValues = this.distribution.getXBetween( range.min, range.max );
	var yValues = this.distribution.getYForXBetween( range.min, range.max );

	// We add the last negative values to the beginning of the arrays to ensure there isn't
	// a thin white line separating the negative and positive sections of the curve
	xValues.unshift( this.xNegativeValues.slice(-1)[0] );
	yValues.unshift( this.yNegativeValues.slice(-1)[0] );

	this.renderCurvePart( xValues, yValues, this.POSITIVE_COLOR );
};

ImprovementGraphRenderer.prototype.renderCurvePart = function( xValues, yValues, color ) {
		this.renderCurveFilled( xValues, yValues, color );
		this.renderCurveOutline( xValues, yValues, color );
};

ImprovementGraphRenderer.prototype.renderCurveFilled = function( xValues, yValues, color ) {
	this.ctx.beginPath();
	this.ctx.moveTo( this.distributionXToCanvasX( _.min( xValues ) ), this.rect.bottom );
	for ( var i = 0, l = xValues.length; i < l; i++ ) {
		this.ctx.lineTo( this.distributionXToCanvasX( xValues[ i ] ), this.distributionYToCanvasY( yValues[ i ] ) );
	}
	this.ctx.lineTo( this.distributionXToCanvasX( _.max( xValues ) ), this.rect.bottom );
	this.ctx.closePath();
	this.ctx.fillStyle = colorUtils.hexToTransparentRGB( color, this.FILL_OPACITY );
	this.ctx.fill();
};

ImprovementGraphRenderer.prototype.renderCurveOutline = function( xValues, yValues, color ) {
	this.ctx.beginPath();
	for ( var i = 0, l = xValues.length; i < l; i++ ) {
		this.ctx.lineTo( this.distributionXToCanvasX( xValues[ i ] ), this.distributionYToCanvasY( yValues[ i ] ) );
	}
	this.ctx.lineWidth = this.OUTLINE_LINE_WIDTH;
	this.ctx.strokeStyle = colorUtils.hexToTransparentRGB( color, this.OUTLINE_OPACITY );
	this.ctx.stroke();
};

ImprovementGraphRenderer.prototype.renderAxisValues = function() {
	var numTicks, canvasY, points, value, canvasX;
	numTicks = this.xAxisRange.getWidth() / this.calculateXAxisInterval() + 1;
	canvasY = this.rect.bottom + this.X_AXIS_TICK_FONT_SIZE + this.X_AXIS_TICK_MARGIN_TOP;
	for ( var i = 0, l = numTicks; i < l; i++ ) {
		points = this.xAxisRange.min + i * this.calculateXAxisInterval();
		value = utils.formatPercentageImprovement( this.convertPointsToPercentage( points ) );
		canvasX = this.rect.x + ( i / ( numTicks - 1 ) ) * this.rect.width;
		this.renderAxisTextWithTick( value, canvasX, canvasY );
	}
};

ImprovementGraphRenderer.prototype.convertPointsToPercentage = function( points ) {
	var mean = this.getControl().proportion.mean;
	var ratio = (points + mean) / mean - 1;
	return Math.round( ratio * 100 );
};

ImprovementGraphRenderer.prototype.setDistribution = function() {
	if ( this.variations.length !== 2 ) {
		throw 'Normal difference distribution only supports two variations';
	}
	this.distribution = new NormalDifferenceDistribution( this.getControl().proportion, this.getExperiment().proportion );
};

ImprovementGraphRenderer.prototype.calculateXAxisInterval = function() {
	return this.distribution.xRange.getWidth() / 5;
};

ImprovementGraphRenderer.prototype.calculateXAxisRange = function() {
	var interval = this.calculateXAxisInterval();
	this.xAxisRange = new Range( Math.floor(this.distribution.xRange.min / interval) * interval, Math.ceil(this.distribution.xRange.max / interval) * interval );
};

ImprovementGraphRenderer.prototype.calculateYAxisRange = function() {
	this.yAxisRange = this.distribution.getYAxisRange();
};

module.exports = ImprovementGraphRenderer;
