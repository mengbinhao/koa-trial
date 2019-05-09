//index.js
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板引擎
//入口文件同级存在view目录
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
	let title = 'hello koa2 templeta engine'
	let people = [
		{name:'jack', age:33},
		{name:'feifei', age:22},
		{name:'yingying', age:1}
	]
	await ctx.render('index', {
		title,
		people
  })
})

app.listen(3000)
console.log('ejs view demo is starting at port 3000')