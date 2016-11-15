const user = require('../proxy/user');

exports.showUserSet =async (ctx,next) =>{
   let auser = await user.getUserbyLoginName(ctx.session.user);
    ctx.state = {
        email:auser.email,
        loginName:auser.loginName,
        city:null,
        name:auser.name,
        loginName:auser.loginName
    };
    await ctx.render('userSet');
}