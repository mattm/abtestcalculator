'use strict';

/**
 * External dependencies
 */
let numeral = require( 'numeral' );

/**
 * Internal dependencies
 */
let colorUtils = require( '../utils/color-utils' ),
	GraphRenderer = require( './graph-renderer' ),
	NumberRange = require( '../stats/number-range' );

class SampleProportionsGraphRenderer extends GraphRenderer {
	constructor( context ) {
		super( context );
	}

	render() {
		this.calculateAxisRanges();
		this.renderSampleProportions();
		super.render();
	}

	calculateXAxisRange() {
		let exactRange = this.calculateXAxisRangeExact();

		this.xAxisRange = new NumberRange(
			Math.floor( exactRange.min / this.getXAxisInterval() ) * this.getXAxisInterval(),
			Math.ceil( exactRange.max / this.getXAxisInterval() ) * this.getXAxisInterval()
		);
	}

	calculateXAxisRangeExact() {
		let xAxisRange, min, max;

		this.variations.forEach( function( variation ) {
			xAxisRange = variation.proportion.xRange;
			if ( min === undefined || xAxisRange.min < min ) {
				min = xAxisRange.min;
			}
			if ( max === undefined || xAxisRange.max > max ) {
				max = xAxisRange.max;
			}
		} );
		return new NumberRange( min, max );
	}

	getXAxisInterval() {
		let width = this.calculateXAxisRangeExact().getWidth();

		if ( width < 0.05 ) {
			return 0.01;
		} else if ( width < 0.3 ) {
			return 0.05;
		} else {
			return 0.10;
		}
	}

	calculateYAxisRange() {
		let yAxisRange, max;

		this.variations.forEach( function( variation ) {
			yAxisRange = variation.proportion.getYAxisRange();
			if ( max === undefined || yAxisRange.max > max ) {
				max = yAxisRange.max;
			}
		} );
		this.yAxisRange = new NumberRange( 0, max );
	}

	renderSampleProportions() {
		this.variations.forEach( function ( variation ) {
			this.renderSamplingDistribution( variation );
		}, this );
	}

	renderSamplingDistribution( variation ) {
		this.renderSampleDistributionFill( variation );
		this.renderSampleDistributionOutline( variation );
		this.renderCenter( variation );
	}

	renderSampleDistributionOutline( variation ) {
		this.ctx.lineWidth = this.OUTLINE_LINE_WIDTH;
		this.ctx.strokeStyle = colorUtils.hexToTransparentRGB( variation.color, this.OUTLINE_OPACITY );
		this.ctx.beginPath();
		this.ctx.moveTo( this.distributionXToCanvasX( variation.proportion.xRange.min), this.rect.bottom );
		variation.proportion.xValues.forEach( function( xValue, i ) {
			this.ctx.lineTo( this.distributionXToCanvasX( xValue ), this.distributionYToCanvasY( variation.proportion.yValues[ i ] ) );
		}, this );
		this.ctx.stroke();
	}

	renderSampleDistributionFill( variation ) {
		this.ctx.beginPath();
		this.ctx.moveTo( this.distributionXToCanvasX( variation.proportion.xRange.min), this.rect.bottom );
		variation.proportion.xValues.forEach( function( xValue, i ) {
			this.ctx.lineTo( this.distributionXToCanvasX( xValue ), this.distributionYToCanvasY( variation.proportion.yValues[ i ] ) );
		}, this );
		this.ctx.closePath();
		this.ctx.fillStyle = colorUtils.hexToTransparentRGB( variation.color, this.FILL_OPACITY );
		this.ctx.fill();
	}

	renderCenter( variation ) {
		this.ctx.beginPath();
		this.ctx.moveTo( this.distributionXToCanvasX( variation.proportion.mean ), this.rect.bottom );
		this.ctx.lineTo( this.distributionXToCanvasX( variation.proportion.mean ), this.distributionYToCanvasY( variation.proportion.getPeakDensity() ) );
		this.ctx.closePath();
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = colorUtils.hexToTransparentRGB( variation.color, 0.5 );
		this.ctx.stroke();
	}

	renderAxisValues() {
		let numTicks, canvasY;

		numTicks = this.xAxisRange.getWidth() / this.getXAxisInterval() + 1;
		canvasY = this.rect.bottom + this.X_AXIS_TICK_FONT_SIZE + this.X_AXIS_TICK_MARGIN_TOP;
		for ( let i = 0, l = numTicks; i < l; i++ ) {
			let proportion = this.xAxisRange.min + i * this.getXAxisInterval(),
				percentage = numeral( proportion ).format( '0%' ),
				canvasX = this.rect.x + ( i / ( numTicks - 1 ) ) * this.rect.width;
			this.renderAxisTextWithTick( percentage, canvasX, canvasY );
		}
	}
}

module.exports = SampleProportionsGraphRenderer;
