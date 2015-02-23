'use strict';

class GraphRenderer {
	constructor( context ) {
		this.ctx = context;
	}

	renderBackground() {
		this.ctx.fillStyle = 'rgba(0,0,0,0)';
		this.ctx.clearRect( this.rect.x, this.rect.y, this.rect.width, this.rect.height );
	}

	get control() {
		return this.variations[ 0 ];
	}

	get experiment() {
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

// See: http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes
// "Class properties and prototype data properties need be created outside the declaration."
GraphRenderer.prototype.OUTLINE_LINE_WIDTH = 2;
GraphRenderer.prototype.OUTLINE_OPACITY = 1;
GraphRenderer.prototype.FILL_OPACITY = 0.7;

GraphRenderer.prototype.X_AXIS_INTERVAL = 0.05;
GraphRenderer.prototype.X_AXIS_TICK_FONT_SIZE = 11;
GraphRenderer.prototype.X_AXIS_TICK_TICKER_HEIGHT = 6;
GraphRenderer.prototype.X_AXIS_TICK_MARGIN_TOP = 8;
GraphRenderer.prototype.X_AXIS_TICK_COLOR = '#bbb';
GraphRenderer.prototype.X_AXIS_TEXT_COLOR = '#ccc';

module.exports = GraphRenderer;
