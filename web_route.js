const router = require('koa-router')();
const sign = require('./controller/sign');
const topic = require('./controller/topic');
const {userUpload} = require('./utils/uploads').upload;




//注册页面
router.get('/',sign.signup);
//方法调试
router.get('x/1',sign.demo);
//提交话题
router.post('topic/add',topic.add);
//图片提交
router.post('uploads',userUpload.single('file'),(ctx,next)=>{
    console.log(ctx.req.file);
    return ctx.body = `/uploads/${ctx.req.file.filename}`;
});


module.exports = router;
