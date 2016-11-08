const router = require('koa-router')();
const sign = require('./controller/sign');
const topic = require('./controller/topic');

//注册页面
router.get('/',sign.signup);
//方法调试
router.get('x/1',sign.demo);
//提交话题
router.post('topic/add',topic.add)


module.exports = router;
