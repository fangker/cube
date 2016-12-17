const user = require('../proxy/user');
const topic = require('../proxy/topic');
const avatar = require('../utils/avatar');



exports.demo = async(ctx,next)=>{

   await  ctx.render('topic');

};

exports.showSignup = async(ctx,next)=>{
    await  ctx.render('signup',{});
}

exports.signup = async(ctx,next)=>{
    let {loginname,email,password,username,check} = ctx.request.body;
    //check验证
    //获得随机头像
    let image = await avatar();
    let thisImage = Math.floor((Math.random()*image.length));
    let state = await user.cereatUser(loginname,password,username,email,image[thisImage]);
    console.log(state);
    ctx.session.user=loginname;
    await ctx.render('signup',{});
}

exports.postLogin = async(ctx,next)=>{
    let {loginname,password,check} = ctx.request.body;
    let state = await user.checkLogin(loginname,password);
    console.log(state)
    ctx.session.sid=state._id;
    ctx.session.name=state.name;
    ctx.session.loginName=state.loginName;
    ctx.session.avatar=state.avatar;
    ctx.response.redirect('/');
}

exports.showLogin = async(ctx,next)=>{
    console.log(ctx.state)
    await ctx.render('login',{});
}
