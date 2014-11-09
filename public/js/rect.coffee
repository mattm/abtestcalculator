class App.Rect
	constructor: (@x, @y, @width, @height) ->
		@bottom = @y + @height
		@right = @x + @width
		@centerX = @x + @width / 2
		@centerY = @y + @height / 2