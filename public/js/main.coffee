$ ->
	variations = [
			participants: 100
			conversions: 45
		,
			participants: 100
			conversions: 50
	]

	calculator = new App.Calculator variations
	calculator.renderGraph()