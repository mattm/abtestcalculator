class App.Rect
	constructor: (@x, @y, @width, @height) ->
		@bottom = @y + @height
		@right = @x + @width