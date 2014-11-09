class App.Range
	constructor: (@min, @max) ->
		@values = [@min, @max]
		@width = @max - @min