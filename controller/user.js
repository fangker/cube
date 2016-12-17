const user = require('../proxy/user');
const message = require('../proxy/message');

exports.showUserSet =async (ctx,next) =>{
   let auser = await user.getUserbyLoginName(ctx.session.loginName);
    let userInfo={
        email:auser.email,
        loginName:auser.loginName,
        city:auser.city,
        name:auser.name,
        depict:auser.depict
    };
    let data=Object.assign(userInfo,ctx.state);

    await ctx.render('userSet',{data:data});
}

exports.userSet = async (ctx,next)=>{
   let{email,name,city,depict}=ctx.request.body;
    ctx.session.name=name;
    await user.setUserInfo(ctx.session.loginName,email,name,city,depict);
    ctx.response.redirect('/user/set')

}

exports.showUserCenter = async(ctx,next)=>{
    let ownMessage=await message.getOwnMessage(ctx.session.loginName);
    console.log(ownMessage)
    await ctx.render('userCenter',{message:ownMessage});
}