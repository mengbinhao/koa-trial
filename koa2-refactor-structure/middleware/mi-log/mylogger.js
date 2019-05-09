const log4js = require('log4js');
const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"]
const access = require("./access.js");
// module.exports = ( options ) => {
//   return async (ctx, next) => {
//     const start = Date.now()
//     log4js.configure({
//       appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
//       categories: { default: { appenders: ['cheese'], level: 'info' } }
//     });
//     const logger = log4js.getLogger('cheese');
//     await next()
//     const end = Date.now()
//     const responseTime = end - start;
//     logger.info(`响应时间为${responseTime/1000}s`);
//   }
// }


//挂载应用日志到 ctx 上
//挂载应用日志到 ctx 上
//挂载应用日志到 ctx 上
// module.exports = () => {
//   const contextLogger = {}

//   const config = {
//     appenders: {
//     	cheese: {
// 	     type: 'dateFile', // 日志类型
// 	     filename: `logs/task`,  // 输出的文件名
// 	     pattern: '-yyyy-MM-dd.log',  // 文件名增加后缀
// 	     alwaysIncludePattern: true   // 是否总是有后缀名
// 	   }
//     },
//     categories: {
//       default: {
//         appenders: ['cheese'],
//         level:'info'
//       }
//     }
//   }
//   //单文件日志
//   // log4js.configure({
//   //   appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
//   //   categories: { default: { appenders: ['cheese'], level: 'info' } }
//   // });

//   const logger = log4js.getLogger('cheese');

//   return async (ctx, next) => {
//   	 // 记录请求开始的时间
//     const start = Date.now()
//     log4js.configure(config)
// 	 // 循环methods将所有方法挂载到ctx 上
//     methods.forEach((method, i) => {
// 	   contextLogger[method] = (message) => {
// 	     logger[method](message)
// 	   }
//     })
//     ctx.log = contextLogger;

//     await next()
//     // 记录完成的时间 作差 计算响应时间
//     const responseTime = Date.now() - start;
//     logger.info(`响应时间为${responseTime/1000}s`);
//   }
// }


//抽出可配置量
//抽出可配置量
//抽出可配置量
// 提取默认公用参数对象
const baseInfo = {
  appLogLevel: 'debug',  // 指定记录的日志级别
  dir: 'logs',		// 指定日志存放的目录名
  env: 'dev',   // 指定当前环境，当为开发环境时，在控制台也输出，方便调试
  projectName: 'koa2-tutorial',  // 项目名，记录在日志中的项目信息
  serverIp: '0.0.0.0'		// 默认情况下服务器 ip 地址
}

// 继承自 baseInfo 默认参数
const opts = Object.assign({}, baseInfo, options || {})
// 需要的变量解构 方便使用
const { env, appLogLevel, dir, serverIp, projectName } = opts
const commonInfo = { projectName, serverIp }

module.exports = (options) => {
  const contextLogger = {}
  const appenders = {}

  appenders.cheese = {
    type: 'dateFile',
    filename: `${dir}/task`,
    pattern: '-yyyy-MM-dd.log',
    alwaysIncludePattern: true
  }
  // 环境变量为dev local development 认为是开发环境
  if (env === "dev" || env === "local" || env === "development") {
    appenders.out = {
      type: "console"
    }
  }
  let config = {
    appenders,
    categories: {
      default: {
        appenders: Object.keys(appenders),
        level: appLogLevel
      }
    }
  }

  const logger = log4js.getLogger('cheese');

  return async (ctx, next) => {
    const start = Date.now()

    log4js.configure(config)
    methods.forEach((method, i) => {
      contextLogger[method] = (message) => {
        logger[method](access(ctx, message, commonInfo))
      }
    })
    ctx.log = contextLogger;

    await next()
    const responseTime = Date.now() - start;
    logger.info(access(ctx, {
      responseTime: `响应时间为${responseTime/1000}s`
    }, commonInfo))
  }
}