window.onload = function () {
	// getLights('#myCanvas', {
	// 	x: 200,
	// 	y: 200,
	// 	r: 60,
	// 	space: 50,
	// 	colorItem: 4
	// })

	// 跑马灯
	setInterval(() => {
		getLights('#myCanvas', {
			x: 400,
			y: 250,
			r: 60,
			space: 50,
			colorItem: getRandomIntInclusive(0, 4)
		})
	}, 400)
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
	ctx.moveTo(x-1.6*r, y+space*2+r*4.6)
	ctx.bezierCurveTo(x-1.5*r, y + space*2 + r*6.4, x+1.5*r, y +space*2 + r*6.4, x+1.6*r, y + space*2 + r*4.6)
	ctx.fill()
	ctx.closePath()

	// 灰边
	ctx.beginPath()
	ctx.moveTo(x-1.6*r, y-0.6*r)
	ctx.fillStyle = '#646464'
	ctx.bezierCurveTo(x-1.4*r, y-2.2*r, x+1.4*r, y-2.2*r, x+1.6*r,y-0.6*r)
	ctx.bezierCurveTo(x+1.6*r, y+2*r, x+1.6*r, y+4*r, x+1.6*r, y + space*2 + r*4.6)
	ctx.bezierCurveTo(x+1.4*r, y+space*2+6.2*r, x-1.4*r, y+space*2+6.2*r, x-1.6*r, y+space*2+r*4.6)
	ctx.fill()
	ctx.closePath()

	// 渐变
	ctx.beginPath()
	ctx.moveTo(x-1.4*r, y-0.6*r)
	ctx.lineWidth = 3
	ctx.strokeStyle = 'black'
	ctx.bezierCurveTo(x-1.2*r, y-2*r, x+1.2*r, y-2*r, x+1.4*r, y-0.6*r)
	ctx.bezierCurveTo(x+1.4*r, y+2*r, x+1.4*r, y+4*r, x+1.4*r, y + space*2 + r*4.6)
	ctx.bezierCurveTo(x+1.2*r, y+space*2+6*r, x-1.2*r, y+space*2+6*r, x-1.4*r, y+space*2+r*4.6)
	ctx.bezierCurveTo(x-1.4*r, y+2*r, x-1.4*r, y+4*r, x-1.4*r, y-0.6*r)
	ctx.stroke()
	ctx.closePath()

	ctx.beginPath()
	ctx.moveTo(x-1.4*r, y-0.6*r)
	gradientColor = ctx.createLinearGradient(x, y - 1.5*r, x, y + space*2 + r*4 + 1.5*r)
	gradientColor.addColorStop(0, '#121212')
	gradientColor.addColorStop(1, '#929292')
	ctx.fillStyle = gradientColor
	ctx.bezierCurveTo(x-1.2*r, y-2*r, x+1.2*r, y-2*r, x+1.4*r, y-0.6*r)
	ctx.bezierCurveTo(x+1.4*r, y+2*r, x+1.4*r, y+4*r, x+1.4*r, y + space*2 + r*4.6)
	ctx.bezierCurveTo(x+1.2*r, y+space*2+6*r, x-1.2*r, y+space*2+6*r, x-1.4*r, y+space*2+r*4.6)
	ctx.bezierCurveTo(x-1.4*r, y+2*r, x-1.4*r, y+4*r, x-1.4*r, y-0.6*r)
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
		ctx.lineWidth = 2
		ctx.strokeStyle = 'black'
		ctx.arc(x, yAxis[i], r + 8, 0, 2 * Math.PI, false)
		ctx.stroke()
		ctx.closePath()

		// 金属边
		ctx.beginPath()
		ctx.lineWidth = 14
		gradientColor = ctx.createLinearGradient(x-r, yAxis[i]-r, x + r, yAxis[i]+r)
		gradientColor.addColorStop(0, '#222')
		gradientColor.addColorStop(0.25, '#ddd')
		gradientColor.addColorStop(0.5, '#777')
		gradientColor.addColorStop(0.75, '#ddd')
		gradientColor.addColorStop(1, '#222')
		ctx.strokeStyle = gradientColor
		ctx.arc(x, yAxis[i], r + 1, 0, 2 * Math.PI, false)
		ctx.stroke()
		ctx.closePath()

		ctx.beginPath()
		ctx.lineWidth = 2
		ctx.strokeStyle = 'black'
		ctx.arc(x, yAxis[i], r+1, 0, 2 * Math.PI, false)
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
	ctx.lineWidth = 3
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
		// ctx.shadowOffsetX = -4
		// ctx.shadowOffsetY = 3.5
		// ctx.shadowBlur = 2
		// ctx.shadowColor = 'rgb(255, 255, 255)'
		ctx.filter = 'blur(4px)'
		ctx.strokeStyle = 'white'
		ctx.arc(x, y, r-5, Math.PI*0.7, -Math.PI*0.4, false)
		ctx.stroke()
		// ctx.shadowBlur = ''
		// ctx.shadowColor = ''
		ctx.closePath()

		// ctx.beginPath()
		// ctx.strokeStyle = 'white'
		// ctx.arc(x, y, r-4, Math.PI*0.7, -Math.PI*0.4, false)
		// ctx.stroke()
		// ctx.closePath()
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
	let width = document.documentElement.clientWidth
	let height = document.documentElement.clientHeight
	canvas.width = Math.round(width * dpr)
	canvas.height = Math.round(height * dpr)
	canvas.style.width = width + 'px'
	canvas.style.height = height + 'px'
	ctx.scale(dpr, dpr)	
}