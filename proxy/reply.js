const Reply = require('../models').Reply;
const Topic = require('../models').Topic;
/* 添加一个回复信息
*
*
 */
exports.addReply=(topicId,content,replyId)=>{
    Topic.update({_id:topicId},{$set:{last_reply_at:Date.now()},$inc:{reply_count:1}})
    let reply = Reply();
    reply.topic_id = topicId;
    reply.content = content;
    reply.reply_id = replyId;
    return   reply.save();
}

exports.getTopicReply = async(topicId,userId) =>{
    let ups =await Reply.find({topic_id:topicId,ups:{$in:[userId]}},{_id:1}).populate('reply_id').sort({create_at:-1}).exec();
    let topic =await Reply.find({topic_id:topicId}).limit(20).populate('reply_id').sort({create_at:-1}).exec();
    let rups=[];
     ups.map(x=>{
         rups.push(x._id);
    })
    let reply ={
        topic:topic,
        ups:rups
    }
    return reply;
}

exports.setUps =async (replId,postReplyId) =>{
    let isReply = await Reply.findOne({_id:replId,ups:postReplyId},{_id:1});
    console.log(isReply);
    if(isReply===null){
       await Reply.update({_id:replId},{$inc:{ups_count:1},$addToSet:{ups:postReplyId}});
    }else{
       await Reply.update({_id:replId},{$inc:{ups_count:-1},$pull:{ups:postReplyId}});
    }
}

