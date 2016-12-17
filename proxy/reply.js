const Reply = require('../models').Reply;
const Topic = require('./topic');
const Message = require('./message');
const User = require('./user');


/* 添加一个回复信息
*
*
 */
exports.addReply=async (topicId,authorId,replyId,content)=>{
    Topic.topicAddReply(topicId);
    let reply = new Reply();
    reply.topic_id = topicId;
    reply.content = content;
    reply.reply_id = replyId;
    reply.save();
    let replyer = await User.getUserbySID(replyId);
    replyer.score=replyer.score +3;
    replyer.reply_count=replyerreply_count +1;
   let replyMessage= await replyer.save();
    await Message.replyAuthorMessage(topicId, replyId, authorId,replyMessage._id);
}

exports.getTopicReply = async(topicId,userId) =>{
    let ups =await Reply.find({topic_id:topicId,ups:{$in:[userId]}},{_id:1}).populate('reply_id').sort({create_at:-1}).exec();
    let topicReply =await Reply.find({topic_id:topicId}).limit(20).populate('reply_id').populate('author_id').sort({create_at:-1}).exec();
    let rups=[];
     ups.map(x=>{
         rups.push(x._id);
    })
    let reply ={
        topic:topicReply,
        ups:rups
    }
    return reply;
}

exports.setUps =async (replId,postReplyId) =>{
    console.log(replId)
    let isReply = await Reply.findOne({_id:replId,ups:postReplyId},{_id:1});
    console.log(isReply);
    if(isReply===null){
      return  Reply.update({_id:replId},{$inc:{ups_count:1},$addToSet:{ups:postReplyId}});
    }else{
     return  Reply.update({_id:replId},{$inc:{ups_count:-1},$pull:{ups:postReplyId}});
    }
}
exports.addToReply =async (topicId ,replyId,toReplyId ,content) =>{
    let replyAuthor = await Reply.findOne({_id:toReplyId}).populate('reply_id');
    let reply=new Reply();
    reply.toreply_id=toReplyId;
    reply.topic_id = topicId;
    reply.reply_id = replyId;
    reply.author_id = replyAuthor.reply_id._id;
    reply.content = content;
    let replyMessage = await reply.save();
//属于回复评论这种情况
    Message.replyAuthorMessage(topicId,replyId,toReplyId,replyMessage._id);

}
