const topic = require('../proxy/topic');
const user = require('../proxy/user');
const reply = require('../proxy/reply');
const mongoose = require('mongoose');

exports.addTopic = async(ctx,next)=>{
     let {title,content,tab} = ctx.request.body;
     let auser = await user.getUserbyLoginName(ctx.session.loginName);
     atopic = await topic.createTopic(auser,title,content,'',tab);

};

exports.getWritePage = async(ctx,next) =>{
    await ctx.render('addTopic',{});

}

exports.showTopicList = async(ctx,next) =>{
    let p = ctx.query.page|| 1;
    let tab = ctx.query.tab || null;
    let topicList= await topic.getTopicList(p);
    let page = await topic.getListPage(tab);
    let edge = await topic.getIndexEdge();
    await ctx.render('topicList',{topic:topicList,page:page,edge:edge});
}

exports.getTopicList = async(ctx,next) => {
    await  ctx.render('signup',{})
}

exports.showTopic = async(ctx,next) =>{
    let topicID = ctx.params.topicid;
    let  sid = mongoose.Types.ObjectId(topicID);
    let  userId = mongoose.Types.ObjectId(ctx.session.sid);
    let gtm =  await topic.getTopicMessage(sid);
    let topic_reply =await reply.getTopicReply(sid,userId);
    let edge = await topic.getTopicEdge(sid)
    let page = await topic.getReplyPage(sid);
        await  ctx.render('topic',{
        topic:gtm,
        reply:topic_reply,
        page:page,
        edge:edge
    })
}