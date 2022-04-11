window.onload = function () {
	getLights('#myCanvas', {
		x: 800,
		y: 200,
		r: 60,
		space: 50,
		colorItem: 4
	})


	// 跑马灯
	// setInterval(() => {
	// 	getLights('#myCanvas', {
	// 		x: 200,
	// 		y: 200,
	// 		r: 60,
	// 		space: 50,
	// 		colorItem: getRandomIntInclusive(0, 4)
	// 	})
	// }, 400)
}

// @description 画指示灯
// @params { ctx, opt[x, y, r, space, colorItem] } canvas 上下文,  指示灯配置项[横坐标，纵坐标，半径，灯间隔，灯颜色]
// @params { colorItem } 0, 全灭 | 1, 红灯 | 2, 黄灯 | 3, 绿灯 | 4, 全亮 
function getLights (selector, options) {
	let canvas = document.querySelector(selector)
	let ctx = canvas.getContext('2d')		
	let opt = {
		x: 100,
		y: 100,
		r: 50,
		space: 20,
		colorItem: 0,
		...options	
	}

	adaptDPR(canvas, ctx)
	drawLampstand(ctx, opt)
	drawBorder(ctx, opt)
	drawLights(ctx, opt)
}

// 画灯座
function drawLampstand (ctx, opt) {
	let {x, y, r, space} = opt
	let gradientColor = null

	// 阴影
	ctx.beginPath()
	ctx.fillStyle = '#191716'
	ctx.moveTo(x-1.62*r, y + space*2 + r*4.5)
	ctx.bezierCurveTo(x-1.4*r, y + space*2 + r*6.3, x+1.4*r, y +space*2 + r*6.3, x+1.62*r, y + space*2 + r*4.5)
	ctx.fill()
	ctx.closePath()

	// 灰边
	ctx.beginPath()
	ctx.fillStyle = '#646464'
	ctx.arc(x, y, 1.7*r, Math.PI*1.1 , -0.1*Math.PI, false)
	ctx.arc(x, y + space*2 + r*4, 1.7*r, Math.PI*0.1, 0.9*Math.PI, false)
	ctx.fill()
	ctx.closePath()

	// 渐变
	ctx.beginPath()
	ctx.fillStyle = 'black'
	ctx.arc(x, y, 1.53*r, Math.PI*1.1 , -0.1*Math.PI, false)
	ctx.arc(x, y + space*2 + r*4, 1.53*r, Math.PI*0.1, 0.9*Math.PI, false)
	ctx.fill()
	ctx.closePath()

	ctx.beginPath()
	gradientColor = ctx.createLinearGradient(x, y - 1.5*r, x, y + space*2 + r*4 + 1.5*r)
	gradientColor.addColorStop(0, '#121212')
	gradientColor.addColorStop(1, '#929292')
	ctx.fillStyle = gradientColor
	ctx.arc(x, y, 1.5*r, Math.PI*1.1 , -0.1*Math.PI, false)
	ctx.arc(x, y + space*2 + r*4, 1.5*r, Math.PI*0.1, 0.9*Math.PI, false)
	ctx.fill()
	ctx.closePath()
}

// 画灯框
function drawBorder (ctx, opt) {
	let {x, y, r, space} = opt
	let yAxis = [y, y + space + r*2, y + space*2 + r*4]
	let gradientColor = null

	for(let i in yAxis) {
		// 黑边
		ctx.beginPath()
		ctx.moveTo(x, yAxis[i])
		ctx.lineWidth = 1
		ctx.strokeStyle = 'black'
		ctx.arc(x, yAxis[i], r + 5, 0, 2 * Math.PI, false)
		ctx.stroke()
		ctx.closePath()

		// 金属边
		ctx.beginPath()
		ctx.lineWidth = 7
		gradientColor = ctx.createLinearGradient(x-r, yAxis[i]-r, x + r, yAxis[i]+r)
		gradientColor.addColorStop(0, '#FCFDFF')
		gradientColor.addColorStop(0.3, '#4B4948')
		gradientColor.addColorStop(0.31, '#4B4948')
		gradientColor.addColorStop(0.6, '#FCFDFF')
		gradientColor.addColorStop(0.61, '#FCFDFF')
		gradientColor.addColorStop(0.9, '#4B4948')
		gradientColor.addColorStop(0.91, '#4B4948')
		gradientColor.addColorStop(1, '#FCFDFF')
		ctx.strokeStyle = gradientColor
		ctx.arc(x, yAxis[i], r + 1, 0, 2 * Math.PI, false)
		ctx.stroke()
		ctx.closePath()

		ctx.beginPath()
		ctx.lineWidth = 2
		ctx.strokeStyle = 'black'
		ctx.arc(x, yAxis[i], r, 0, 2 * Math.PI, false)
		ctx.stroke()
		ctx.closePath()
	}
}

// 画灯组
function drawLights (ctx, opt) {
	let {x, r, y, space, colorItem} = opt 
	let yAxis = [y, y + space + r*2, y + space*2 + r*4]
	let colorArr = [
		[false, '#646464', '#646464'],
		[true, '#6D232B', '#EA3529'],
		[true, '#BA9442', '#FDF250'],
		[true, '#396E38', '#C3EC54']
	]

	switch (colorItem) {
		case 0 :
			drawSingleLight(ctx, opt, yAxis[0], colorArr[0])
			drawSingleLight(ctx, opt, yAxis[1], colorArr[0])
			drawSingleLight(ctx, opt, yAxis[2], colorArr[0])
			break
		case 1:
			drawSingleLight(ctx, opt, yAxis[0], colorArr[1])
			drawSingleLight(ctx, opt, yAxis[1], colorArr[0])
			drawSingleLight(ctx, opt, yAxis[2], colorArr[0])
			break
		case 2:
			drawSingleLight(ctx, opt, yAxis[0], colorArr[0])
			drawSingleLight(ctx, opt, yAxis[1], colorArr[2])
			drawSingleLight(ctx, opt, yAxis[2], colorArr[0])
			break
		case 3:
			drawSingleLight(ctx, opt, yAxis[0], colorArr[0])
			drawSingleLight(ctx, opt, yAxis[1], colorArr[0])
			drawSingleLight(ctx, opt, yAxis[2], colorArr[3])
			break
		case 4:
			drawSingleLight(ctx, opt, yAxis[0], colorArr[1])
			drawSingleLight(ctx, opt, yAxis[1], colorArr[2])
			drawSingleLight(ctx, opt, yAxis[2], colorArr[3])
			break
		default:
			drawSingleLight(ctx, opt, yAxis[0], colorArr[0])
			drawSingleLight(ctx, opt, yAxis[1], colorArr[0])
			drawSingleLight(ctx, opt, yAxis[2], colorArr[0])
	}
}

// 画灯
function drawSingleLight (ctx, opt, y, color) {
	let { x, r } = opt
	ctx.beginPath()
	ctx.lineWidth = 2
	let gradientColor = ctx.createLinearGradient(x-r, y-r, x+r, y+r)
	gradientColor.addColorStop(0, color[1])
	gradientColor.addColorStop(0.2, color[2])
	gradientColor.addColorStop(1, color[1])
	ctx.fillStyle = gradientColor
	ctx.arc(x, y, r, 0, Math.PI*2, false)
	ctx.fill()
	ctx.closePath()

	if (color[0]) {
		ctx.beginPath()
		ctx.strokeStyle = '#fff'
		ctx.arc(x, y, r-4, Math.PI*0.7, -Math.PI*0.4, false)
		ctx.stroke()
		ctx.closePath()
	}
}

// 生成随机整数（包含首尾）
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min 
}

// 消除 canvas 锯齿
function adaptDPR (canvas, ctx) {
	let dpr = window.devicePixelRatio
	let width = canvas.width
	let height = canvas.height
	canvas.width = Math.round(width * dpr)
	canvas.height = Math.round(height * dpr)
	canvas.style.width = width + 'px'
	canvas.style.height = height + 'px'
	ctx.scale(dpr, dpr)	
}