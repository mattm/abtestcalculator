App.Utils =
	hexToRgb: (hex) ->
		result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec hex;
		if result
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		else
			null

	# http://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
	getPixelRatio: ->
		ctx = document.createElement("canvas").getContext("2d")
		dpr = window.devicePixelRatio || 1
		bsr = ctx.webkitBackingStorePixelRatio ||
			ctx.mozBackingStorePixelRatio ||
			ctx.msBackingStorePixelRatio ||
			ctx.oBackingStorePixelRatio ||
			ctx.backingStorePixelRatio || 1
		dpr / bsr

	createHiDPICanvas: (w, h) ->
		ratio = this.getPixelRatio()
		can = document.createElement "canvas"
		can.width = w * ratio
		can.height = h * ratio
		can.style.width = w + "px"
		can.style.height = h + "px"
		can.getContext("2d").setTransform ratio, 0, 0, ratio, 0, 0
		can