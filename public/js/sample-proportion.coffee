class App.SampleProportion

	SD_TO_GRAPH = 5

	constructor: (@participants, @conversions) ->
		@p = @conversions / @participants
		@sd = this.getStdDev()

	getStdDev: ->
		Math.sqrt @p * (1 - @p) / @participants

	getXAxisRange: ->
		new App.Range @p - SD_TO_GRAPH * @sd, @p + SD_TO_GRAPH * @sd