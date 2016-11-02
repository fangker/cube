const user = require('../proxy/user');
const topic1=require('../models/index').Topic;

exports.signup = async(ctx,next)=>{
    let a =await user.getUserByLoginName('aaa');
    console.log(a,11111111);
    ctx.session.view = "indexss";
    ctx.session.man = "indexss";
    ctx.state = {
        title: 'koa2 title'
    };

    await ctx.render('index');
    await next();
};

exports.demo = async(ctx,next)=>{

   let a= await topic1.findOne({}).exec();
    console.log(a);


};