class App.Area
	constructor: (@x, @y, @width, @height) ->
		@bottom = @y + @height
		@right = @x + @width