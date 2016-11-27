const reply = require('../proxy/reply');
const ObjectId = require('mongoose').Types.ObjectId;

exports.addReply=async(ctx,next)=>{
    let{topicid,content}=(ctx.request.body);
    try{
        topic = ObjectId(ctx.request.body.topicid);
        replyId = ObjectId('58283adeddb4994e10e7856c');
        let state= await reply.addReply(topic,content,replyId);
    }catch(error) {
        if(error){
            ctx.body = { "state": "error" };
        }
    }
    ctx.body = { "state": "ok"};
}

exports.setUps=async(ctx,next)=>{
    let {topicid,replyid}=(ctx.request.query);
    let replyId = ObjectId(replyid.trim());
    let postReplyId = ObjectId('582acc7acad5744628443666');
    await  reply.setUps(replyId ,postReplyId);
    ctx.body = { "state": "ok"};
}

exports.addToReply=async(ctx,next)=>{
    let {topicid,replyid,content}=(ctx.request.query);
   // let toReplyId = ctx.session.user_id;
    let replyId = ObjectId(replyid);
    let toReplyId = ObjectId('582acc7acad5744628443666');
    let topicId = ObjectId(topicid);

    await  reply.addToReply(topicId ,replyId,toReplyId ,content);
    ctx.body = { "state": "ok"};
}