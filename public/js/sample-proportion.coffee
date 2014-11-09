class App.SampleProportion

	SD_TO_GRAPH = 5
	POINTS_PER_CURVE = 1000

	constructor: (@participants, @conversions) ->
		@p = @conversions / @participants
		@sd = this.getStdDev()
		@xRange = this.getXAxisRange()
		@xValues = this.getCurveXValues()
		@yValues = this.getCurveYValues()

	getStdDev: ->
		Math.sqrt @p * (1 - @p) / @participants

	getXAxisRange: ->
		new App.Range @p - SD_TO_GRAPH * @sd, @p + SD_TO_GRAPH * @sd

	# See: http://en.wikipedia.org/wiki/Normal_distribution
	getDensity: (x) ->
		a = 1 / (@sd * Math.sqrt(2 * Math.PI))
		b = Math.exp(-(Math.pow(x - @p, 2)) / (2 * Math.pow(@sd, 2)))
		a * b

	getCurveXValues: ->
		xValues = []
		interval = (@xRange.max - @xRange.min) / (POINTS_PER_CURVE + 1)
		xValues.push @xRange.min + interval * (i + 1) for i in [0..POINTS_PER_CURVE - 1]
		xValues

	getCurveYValues: ->
		yValues = []
		yValues.push @getDensity xValue for xValue in @xValues
		yValues