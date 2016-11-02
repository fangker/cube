const router = require('koa-router')();
const sign = require('./controller/sign');

//注册页面
router.get('/',sign.signup);
//方法调试
router.get('x/1',sign.demo);


module.exports = router;
