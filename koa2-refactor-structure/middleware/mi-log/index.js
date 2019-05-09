const logger = require("./logger")
//对日志中间件进行错误处理
module.exports = (options) => {
   const loggerMiddleware = logger(options)

   return (ctx, next) => {
     return loggerMiddleware(ctx, next)
     .catch((e) => {
         if (ctx.status < 500) {
             ctx.status = 500;
         }
         ctx.log.error(e.stack);
         ctx.state.logged = true;
         ctx.throw(e);
     })
   }
 }