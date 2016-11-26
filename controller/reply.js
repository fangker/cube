const reply = require('../proxy/reply');
const mongoose = require('mongoose');

exports.addReply=async(ctx,next)=>{
    let{topicid,content}=(ctx.request.body);
    try{
        topic = mongoose.Types.ObjectId(ctx.request.body.topicid);
        replyId = mongoose.Types.ObjectId('58283adeddb4994e10e7856c');
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
    let replyId = mongoose.Types.ObjectId(replyid.trim());
    let postReplyId = mongoose.Types.ObjectId('582acc7acad5744628443666');
    await  reply.setUps(replyId ,postReplyId);
    ctx.body = { "state": "ok"};
}