window.onload = function () {
	getLights('#myCanvas', {
		x: 800,
		y: 200,
		r: 60,
		space: 50,
		colorItem: 2 
	})

	// 跑马灯
	setInterval(() => {
		getLights('#myCanvas', {
			x: 200,
			y: 200,
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
	drawBorder(ctx, opt)
	drawLights(ctx, opt)
}

// 画灯框
function drawBorder (ctx, opt) {
	let {x, y, r, space} = opt
	let gradientColor = null
	let yAxis = [y, y + space + r*2, y + space*2 + r*4]
	for(let i in yAxis) {
		// 黑边
		ctx.beginPath()
		ctx.moveTo(x, yAxis[i])
		ctx.lineWidth = 1
		ctx.strokeStyle = 'black'
		ctx.arc(x, yAxis[i], r + 3, 0, 2 * Math.PI, false)
		ctx.stroke()
		ctx.closePath()

		// 金属边
		ctx.beginPath()
		ctx.lineWidth = 7
		gradientColor = ctx.createLinearGradient(x-r, yAxis[i]-r, x + r, yAxis[i]+r)
		gradientColor.addColorStop(0, '#FCFDFF')
		gradientColor.addColorStop(0.3, '#5C6063')
		gradientColor.addColorStop(0.31, '#5C6063')
		gradientColor.addColorStop(0.6, '#FCFDFF')
		gradientColor.addColorStop(0.61, '#FCFDFF')
		gradientColor.addColorStop(0.9, '#5C6063')
		gradientColor.addColorStop(0.91, '#5C6063')
		gradientColor.addColorStop(1, '#FCFDFF')
		ctx.strokeStyle = gradientColor
		ctx.arc(x, yAxis[i], r + 1, 0, 2 * Math.PI, false)
		ctx.stroke()
		ctx.closePath()
	}
}

// 画灯本体
function drawLights (ctx, opt) {
	let {x, y, r, space, colorItem} = opt
	let colorConfig = [
		['black', 'black', 'black', 'black', 'black', 'black'],
		['#6D232B', '#EA3529', 'black', 'black', 'black', 'black'],
		['black', 'black', '#BA9442', '#FDF250', 'black', 'black'],
		['black', 'black', 'black', 'black', '#396E38', '#C3EC54'],
		['#6D232B', '#EA3529', '#BA9442', '#FDF250', '#396E38', '#C3EC54']
	]
	let y1 = y
	let y2 = y + space + r*2
	let y3 = y + space*2 + r*4
	ctx.beginPath()
	ctx.lineWidth = 2
	gradientColor = ctx.createLinearGradient(x - r, y1 - r, x + r, y1 + r)
	gradientColor.addColorStop(0, colorConfig[colorItem][0])
	gradientColor.addColorStop(0.2, colorConfig[colorItem][1])
	gradientColor.addColorStop(1, colorConfig[colorItem][0])
	ctx.fillStyle = gradientColor
	ctx.arc(x, y1, r, 0, Math.PI*2, false)
	ctx.fill()
	ctx.closePath()
	ctx.beginPath()
	ctx.strokeStyle = '#fff'
	ctx.arc(x, y1, r - 3 , Math.PI*0.8, -0.3*Math.PI, false)
	ctx.stroke()
	ctx.closePath()

	ctx.beginPath()
	gradientColor = ctx.createLinearGradient(x - r, y2 - r, x + r, y2 + r)
	gradientColor.addColorStop(0, colorConfig[colorItem][2])
	gradientColor.addColorStop(0.2, colorConfig[colorItem][3])
	gradientColor.addColorStop(1, colorConfig[colorItem][2])
	ctx.fillStyle = gradientColor
	ctx.arc(x, y2, r, 0, Math.PI*2, false)
	ctx.fill()
	ctx.closePath()
	ctx.beginPath()
	ctx.strokeStyle = '#fff'
	ctx.arc(x, y2, r - 3 , Math.PI*0.8, -0.3*Math.PI, false)
	ctx.stroke()
	ctx.closePath()	

	ctx.beginPath()
	gradientColor = ctx.createLinearGradient(x - r, y3 - r, x + r, y3 + r)
	gradientColor.addColorStop(0, colorConfig[colorItem][4])
	gradientColor.addColorStop(0.2, colorConfig[colorItem][5])
	gradientColor.addColorStop(1, colorConfig[colorItem][4])
	ctx.fillStyle = gradientColor
	ctx.arc(x, y3, r, 0, Math.PI*2, false)
	ctx.fill()
	ctx.closePath()
	ctx.beginPath()
	ctx.strokeStyle = '#fff'
	ctx.arc(x, y3, r - 3 , Math.PI*0.8, -0.3*Math.PI, false)
	ctx.stroke()
	ctx.closePath()	
}

// 生成随机整数（包含首尾）
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min 
}