const Koa = require('koa')

const app = new Koa()

app.use(async ctx => {
	//let url = ctx.request.url
	let url = ctx.url
  ctx.body = url
}).listen(3000, _ => {
	console.log('server is running at http://localhost:3000')
})

