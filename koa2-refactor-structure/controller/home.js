const HomeService = require('../service/home')
module.exports = {
	index: async function (ctx, next) {
		await ctx.render("home/index", {title: "xx欢迎您"})
	},
	home: async(ctx, next) => {
		console.log(ctx.request.query)
		console.log(ctx.request.querystring)
		ctx.response.body = '<h1>HOME page</h1>'
	},
	homeParams: async(ctx, next) => {
		console.log(ctx.params)
		ctx.response.body = '<h1>HOME page /:id/:name</h1>'
	},
	login: async(ctx, next) => {
		ctx.response.body =
			`
			<form action="/user/register" method="post">
				<input name="name" type="text" placeholder="请输入用户名：ikcamp"/> 
				<br/>
				<input name="password" type="text" placeholder="请输入密码：123456"/>
				<br/>
				<button>GoGoGo</button>
			</form>
		`
	},
	login2: async(ctx, next) => {
    await ctx.render('home/login',{
      btnName: 'GoGoGo'
    })
  },
	register: async(ctx, next) => {
    let {name,password} = ctx.request.body
    let res = await HomeService.register(name, password)
		if(res.status == "-1"){
			await ctx.render("home/login", res.data)
		}else{
			ctx.state.title = "个人中心"
			await ctx.render("home/success", res.data)
		}
  }
}