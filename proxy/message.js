const Message = require('../models').Message;
const user = require('./user');
//被回复
exports.toReplyMessage = (topicId , masterId, toReplyId) =>{
    let message = new Message();
    message.master_id = masterId;
    message.reply_id = toReplyId;
    message.topic_id = topicId;
    message.type = 'at';
    message.save();
}
//帖子的新回复
exports.replyAuthorMessage = (topicId, replyId ,masterId,reply) =>{
    let message = new Message();
    message.master_id = masterId;
    message.reply_id = replyId;
    message.topic_id = topicId;
    message.reply = reply;
    message.type='reply';
    message.save();
}
//获得信息
exports.getOwnMessage = async(loginName)=>{
    let auser =  await user.getUserByLoginName(loginName);
    return await Message.find({master_id:auser._id}).populate('reply_id',{name:1}).populate('topic_id',{title:1});

}