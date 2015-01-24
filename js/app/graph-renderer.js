'use strict';

function GraphRenderer( context ) {
	this.ctx = context;
}

GraphRenderer.prototype = {
	OUTLINE_LINE_WIDTH: 2,
	OUTLINE_OPACITY: 1,
	FILL_OPACITY: 0.7,

	X_AXIS_INTERVAL: 0.05,
	X_AXIS_TICK_FONT_SIZE: 11,
	X_AXIS_TICK_TICKER_HEIGHT: 6,
	X_AXIS_TICK_MARGIN_TOP: 8,
	X_AXIS_TICK_COLOR: '#777',
	X_AXIS_TEXT_COLOR: '#333',

	setRect: function( rect ) {
		this.rect = rect;
	},

	renderBackground: function() {
		this.ctx.fillStyle = 'rgba(0,0,0,0)';
		this.ctx.clearRect( this.rect.x, this.rect.y, this.rect.width, this.rect.height );
	},

	setVariations: function( variations ) {
		this.variations = [ variations.a, variations.b ];
	},

	getControl: function() {
		return this.variations[ 0 ];
	},

	getExperiment: function() {
		return this.variations[ 1 ];
	},

	distributionXToCanvasX: function( distributionX ) {
		return this.rect.x + this.rect.width * (distributionX - this.xAxisRange.min) / this.xAxisRange.getWidth();
	},

	distributionYToCanvasY: function( distributionY ) {
		return this.rect.bottom - this.rect.height * distributionY / this.yAxisRange.max;
	},

	render: function() {
		this.renderAxis();
	},

	calculateAxisRanges: function() {
		this.calculateXAxisRange();
		this.calculateYAxisRange();
	},

	renderAxis: function() {
		this.renderAxisLine();
		this.renderAxisValues();
	},

	renderAxisLine: function() {
		this.ctx.beginPath();
		this.ctx.moveTo( this.rect.x, this.rect.bottom + 0.5 );
		this.ctx.lineTo( this.rect.right, this.rect.bottom + 0.5 );
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = this.X_AXIS_TICK_COLOR;
		this.ctx.stroke();
	},

	renderTick: function( canvasX ) {
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = this.X_AXIS_TICK_COLOR;
		this.ctx.beginPath();
		this.ctx.moveTo( canvasX, this.rect.bottom );
		this.ctx.lineTo( canvasX, this.rect.bottom + this.X_AXIS_TICK_TICKER_HEIGHT );
		this.ctx.stroke();
	},

	renderAxisTextWithTick: function( value, canvasX, canvasY ) {
		this.renderAxisText( value, canvasX, canvasY );
		this.renderTick( canvasX );
	},

	renderAxisText: function( value, canvasX, canvasY ) {
		this.ctx.font = this.X_AXIS_TICK_FONT_SIZE + 'px Helvetica';
		this.ctx.textAlign = 'center';
		this.ctx.fillStyle = this.X_AXIS_TEXT_COLOR;
		this.ctx.fillText( value, canvasX, canvasY );
	}
};

module.exports = GraphRenderer;
