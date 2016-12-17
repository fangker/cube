const router = require('koa-router')();
const sign = require('./controller/sign');
const topic = require('./controller/topic');
const user = require('./controller/user');
const reply = require('./controller/reply');
const {userUpload} = require('./utils/uploads').upload;





//注册页面
router.get('signup',sign.showSignup);
//提交注册
router.post('signup',sign.signup);
//提交话题
router.post('topic/add',topic.addTopic);
//提交话题页面
router.get('topic/add',topic.getWritePage);
//个人信息设置
router.get('user/set',user.showUserSet);
//个人设置提交
router.post('user/set',user.userSet);
//文章内容页面获得
router.get('topic/get/:topicid',topic.showTopic);
//话题列表
router.get('/',topic.showTopicList);
//提交回复
router.post('reply/post',reply.addReply);
//回复某人
router.post('toreply/post',reply.addToReply);
//点赞
router.get('reply/ups',reply.setUps);
//用户登录
router.get('login',sign.showLogin);
//用户登录
router.post('login',sign.postLogin);
//个人消息
router.get('user/center',user.showUserCenter);
//图片提交
router.post('uploads',userUpload.single('file'),(ctx,next)=>{
    console.log(ctx.req.file);
    return ctx.body = `/uploads/${ctx.req.file.filename}`;
})


module.exports = router;
