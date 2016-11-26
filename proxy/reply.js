const Reply = require('../models').Reply;
const Topic = require('../models').Topic;
/* 添加一个回复信息
*
*
 */
exports.addReply=(topicId,content,replyId)=>{
    Topic.update({_id:topicId},{$set:{last_reply_at:Date.now()}})
    let reply = Reply();
    reply.topic_id = topicId;
    reply.content = content;
    reply.reply_id = replyId;
    return   reply.save();
}

exports.getTopicReply = (topicId) =>{
    return Reply.find({topic_id:topicId}).populate('reply_id').sort({create_at:-1}).exec();

}

exports.setUps = (topicId) =>{
    return Reply.update({})
}