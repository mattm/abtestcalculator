class App.Variation
	constructor: (@name, @color, @participants, @conversions) ->
		@proportion = new App.SampleProportion @participants, @conversions