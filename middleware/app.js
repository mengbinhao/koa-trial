const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next)=>{
  let startTime = new Date().getTime()
  await next()
  let endTime = new Date().getTime()
  console.log(`此次的响应时间为：${endTime - startTime}ms`)
})

app.use(async (ctx, next) => {
  console.log('111, 然后doSomething')
  await next()
  console.log('111 end')
})

app.use(async (ctx, next) => {
  console.log('222, 然后doSomething')
  //await next()
  console.log('222 end')
})

app.use(async (ctx, next) => {
  console.log('333, 然后doSomething')
  //await next()
  console.log('333 end')
})

app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
})