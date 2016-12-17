const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const session = require('koa-session2');
const Store = require('./common/db_store');
const config = require('./config');
const index = require('./web_route');




// middlewares
app.use(session({
  key: config.cook_key,
  store: new Store({
    redis_port: config.redis_port,
    redis_host: config.redis_host,
    redis_family: config.redis_family,
    redis_password: config.redis_password,
    redis_db: config.redis_db
  })
}));

app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'jade'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(async (ctx, next) => {
  if(ctx.session.loginName){
    ctx.state = {
      user:{
      loginName:ctx.session.loginName,
      sid:ctx.session.sid,
      name:ctx.session.name,
      avatar:ctx.session.avatar
  }
    };
  }else{
    ctx.state = {
      user:{

      }
    };
  }
 await next();
});


router.use('/', index.routes(), index.allowedMethods());


app.use(router.routes(), router.allowedMethods());
// response


app.on('error', function (err, ctx) {
  console.log(err);
  logger.error('server error', err, ctx);
});


module.exports = app;