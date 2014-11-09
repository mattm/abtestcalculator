$ ->
	data =
		title: 'Original vs Variation'
		variations: [
				name: 'Original'
				participants: 100
				conversions: 45
				color: '#00aa00'
			,
				name: 'Variation'
				participants: 100
				conversions: 50
				color: '#0000ff'
		]

	variations = []
	variations.push new App.Variation item.name, item.color, item.participants, item.conversions for item in data.variations

	calculator = new App.Calculator data.title, variations
	calculator.render()