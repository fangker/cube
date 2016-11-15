const topic = require('../proxy/topic');
const user = require('../proxy/user');

exports.add = async(ctx,next)=>{
    console.log(ctx.session.user);
    let {title,content,tab} = ctx.request.body;
     auser = await user.getUserbyLoginName(ctx.session.user);
     atopic = await topic.createTopic(auser._id,title,content,'',tab);
     atopic._id
};

exports.getWritePage = async(ctx,next) =>{
    await ctx.render('addTopic',{});

}

exports.getTopicList = async(ctx,next) => {
    await  ctx.render('signup',{})
}