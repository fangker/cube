const router = require('koa-router')();
const sign = require('./controller/sign');
const topic = require('./controller/topic');
const user = require('./controller/user');
const {userUpload} = require('./utils/uploads').upload;




//注册页面
router.get('/1',sign.demo);
//方法调试
router.get('x/1',sign.demo);
//注册页面
router.get('signup',sign.showSignup);
//提交注册
router.post('signup',sign.signup);
//提交话题
router.post('topic/add',topic.add);
//提交话题页面
router.get('topic/add',topic.getWritePage);
//个人信息页面
router.get('user/set',user.showUserSet);
//文章内容页面获得
router.get('topic/get/:topicid',topic.showTopic);
//话题列表
router.get('/',topic.showTopicList);
//图片提交
router.post('uploads',userUpload.single('file'),(ctx,next)=>{
    console.log(ctx.req.file);
    return ctx.body = `/uploads/${ctx.req.file.filename}`;
});


module.exports = router;
