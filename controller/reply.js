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
    ctx.body = { "state": "ok" ,"reply":state};
}