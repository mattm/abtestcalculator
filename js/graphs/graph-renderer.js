'use strict';

class GraphRenderer {
	constructor( context ) {
		this.ctx = context;

		// Probably a better way to do this
		// Or not: http://stackoverflow.com/questions/22528967/es6-class-variable-alternatives
		this.OUTLINE_LINE_WIDTH = 2;
		this.OUTLINE_OPACITY = 1;
		this.FILL_OPACITY = 0.7;

		this.X_AXIS_INTERVAL = 0.05;
		this.X_AXIS_TICK_FONT_SIZE = 11;
		this.X_AXIS_TICK_TICKER_HEIGHT = 6;
		this.X_AXIS_TICK_MARGIN_TOP = 8;
		this.X_AXIS_TICK_COLOR = '#bbb';
		this.X_AXIS_TEXT_COLOR = '#ccc';
	}

	setRect( rect ) {
		this.rect = rect;
	}

	renderBackground() {
		this.ctx.fillStyle = 'rgba(0,0,0,0)';
		this.ctx.clearRect( this.rect.x, this.rect.y, this.rect.width, this.rect.height );
	}

	setVariations( variations ) {
		this.variations = [ variations.a, variations.b ];
	}

	getControl() {
		return this.variations[ 0 ];
	}

	getExperiment() {
		return this.variations[ 1 ];
	}

	distributionXToCanvasX( distributionX ) {
		return this.rect.x + this.rect.width * (distributionX - this.xAxisRange.min) / this.xAxisRange.getWidth();
	}

	distributionYToCanvasY( distributionY ) {
		return this.rect.bottom - this.rect.height * distributionY / this.yAxisRange.max;
	}

	render() {
		this.renderAxis();
	}

	calculateAxisRanges() {
		this.calculateXAxisRange();
		this.calculateYAxisRange();
	}

	renderAxis() {
		this.renderAxisLine();
		this.renderAxisValues();
	}

	renderAxisLine() {
		this.ctx.beginPath();
		this.ctx.moveTo( this.rect.x, this.rect.bottom + 0.5 );
		this.ctx.lineTo( this.rect.right, this.rect.bottom + 0.5 );
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = this.X_AXIS_TICK_COLOR;
		this.ctx.stroke();
	}

	renderTick( canvasX ) {
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = this.X_AXIS_TICK_COLOR;
		this.ctx.beginPath();
		this.ctx.moveTo( canvasX, this.rect.bottom );
		this.ctx.lineTo( canvasX, this.rect.bottom + this.X_AXIS_TICK_TICKER_HEIGHT );
		this.ctx.stroke();
	}

	renderAxisTextWithTick( value, canvasX, canvasY ) {
		this.renderAxisText( value, canvasX, canvasY );
		this.renderTick( canvasX );
	}

	renderAxisText( value, canvasX, canvasY ) {
		this.ctx.font = this.X_AXIS_TICK_FONT_SIZE + 'px Helvetica';
		this.ctx.textAlign = 'center';
		this.ctx.fillStyle = this.X_AXIS_TEXT_COLOR;
		this.ctx.fillText( value, canvasX, canvasY );
	}
};

module.exports = GraphRenderer;
