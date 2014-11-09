$ ->
	data = [
			name: 'Original'
			participants: 100
			conversions: 45
			color: '#00aa00'
		,
			name: 'Variation'
			participants: 100
			conversions: 50
			color: 'blue'
	]

	variations = []
	variations.push new App.Variation item.name, item.color, item.participants, item.conversions for item in data

	calculator = new App.Calculator variations
	calculator.renderGraph()