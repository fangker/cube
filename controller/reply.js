const reply = require('../proxy/reply');
const ObjectId = require('mongoose').Types.ObjectId;

exports.addReply=async(ctx,next)=>{
    let{topicid,authorid,content}=(ctx.request.body);
    try{
        let topicId = ObjectId(ctx.request.body.topicid);
        let replyId = ObjectId(ctx.session.sid);
        let authorId =ObjectId(authorid);
        let state= await reply.addReply(topicId,authorId,replyId,content);
    }catch(error) {
        if(error){
            ctx.body = { "state": "error" };
        }
    }
    ctx.body = { "state": "ok"};
}

exports.setUps=async(ctx,next)=>{
    let {topicid,replyid}=(ctx.request.query);
    let replyId = ObjectId(replyid);
    let postReplyId = ObjectId(ctx.session._id);
    await reply.setUps(replyId ,postReplyId);
    ctx.body = { "state": "ok"};
}

exports.addToReply=async(ctx,next)=>{
    let {topicid,replyid,content}=(ctx.request.body);
    let replyId = ObjectId(ctx.session.sid);
    //被回复人
    let toReplyId = ObjectId(replyid);
    //被回复主题
    let topicId = ObjectId(topicid);
     await  reply.addToReply(topicId ,replyId,toReplyId ,content);
    ctx.body = { "state": "ok"};
}