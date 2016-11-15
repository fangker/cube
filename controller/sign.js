const user = require('../proxy/user');
const topic = require('../proxy/topic');


exports.signup = async(ctx,next)=>{
    ctx.session.view = "indexss";
    ctx.session.man = "indexss";
    ctx.state = {
        title: 'koa2 titl'
    };

    await ctx.render('index');
    await next();
};

exports.demo = async(ctx,next)=>{

   await  ctx.render('topic');


};

exports.showSignup = async(ctx,next)=>{
    await  ctx.render('signup',{});
}

exports.signup = async(ctx,next)=>{
    console.log(ctx.request.body);
    let {loginname,email,password,username,check} = ctx.request.body;
    //check验证
    let state = await user.cereatUser(loginname,password,username,email);
    console.log(state);
    ctx.session.user=loginname;
    await ctx.render('signup',{});
}

