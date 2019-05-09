const Koa = require('koa')

const app = new Koa()

app.use(async ctx => {
	ctx.body = `hello koa2`
}).listen(3000, _ => {
	console.log('server is running at http://localhost:3000')
})

