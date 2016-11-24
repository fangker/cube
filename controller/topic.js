const topic = require('../proxy/topic');
const user = require('../proxy/user');
const reply = require('../proxy/reply');
const mongoose = require('mongoose');

exports.add = async(ctx,next)=>{
     console.log(ctx.session.user);
     let {title,content,tab} = ctx.request.body;
     auser = await user.getUserbyLoginName(ctx.session.user);
     atopic = await topic.createTopic(auser._id,title,content,'',tab);
     console.log(atopic);
};

exports.getWritePage = async(ctx,next) =>{
    await ctx.render('addTopic',{});

}

exports.showTopicList = async(ctx,next) =>{
    let p = ctx.query.page|| 1;
    let tab = ctx.query.tab || null;
    let topicList= await topic.getTopicList(p)
    let page = await topic.getListPage(tab);
    await ctx.render('topicList',{data:topicList,page:page});
}

exports.getTopicList = async(ctx,next) => {
    await  ctx.render('signup',{})
}

exports.showTopic = async(ctx,next) =>{
    let topicID = ctx.params.topicid;
    let  sid = mongoose.Types.ObjectId(topicID);
    let gtm =  await topic.getTopicMessage(sid);
    let  topic_reply = await reply.getTopicReply(sid);
    await  ctx.render('topic',{topic:gtm,reply:topic_reply})
    console.log(topic_reply);
}