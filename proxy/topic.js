const Topic = require('../models').Topic;
const User = require('../models').User;

/** 创建一个文章
* @{String} title
* @{String} content
* @{ObjectId} author_id
* @{String} image
* @{String} tab
 */
exports.createTopic = (author,title,content,image,tab)=>{
    let topic = new Topic();
    topic.author_id = author;
    topic.title = title;
    topic.content = content;
    topic.tab = tab;
    topic.image = image;
    author.score = author.score + 6;
    author.save();
    return  topic.save();
}
/** 根据文章ID获取文章内容
 * @{String} topicID 话题ID
 */
exports.getTopicMessage = (topicId) =>{
   return Topic.findByIdAndUpdate({_id:`${topicId}`},{'$inc':{'visit_count':1}}, {new: true}).populate('author_id',{}).exec();
}
/** topicList 页面展示
 * @returns {Array}
 */
exports.getTopicList = (p) => {
    return Topic.find({},{content:0})
        .sort({top:-1}).sort({create_at:-1}).sort({last_reply_at:1}).skip((p-1)*20).limit(20)
        .populate('author_id',{name:1,loginName:1,avatar:1}) .exec();
}

/** 获得topic分页信息
 * @returns {Number}
 */
exports.getListPage = (tab) => {
    return Topic.count({});
}
/** 获得reply分页信息
 * @returns {Number}
 */
exports.getReplyPage = (topicId) => {
    return Topic.find({_id:topicId},{reply_count:1});
}
/** 获得侧边栏数据信息
 * @returns {JSON}
*/
exports.getTopicEdge = async(topicId)=>{
   let {tab,author_id:authorId} = await Topic.findOne({_id:topicId},{tab:1,author_id:1}).limit(12);;
   let fireTopic = await Topic.find({tab:tab}).sort({visit_count:-1}).limit(12);;
   let comment = await Topic.find({tab:tab}).sort({visit_count:-1}).sort({visit_count:-1}).limit(12);
   let zeroReply =  await Topic.find({reply_count:0}).limit(12);
    let data ={
        fireTopic:fireTopic,
        comment:comment,
        zeroReply:zeroReply
    }
    return data;
}
exports.getIndexEdge = async()=>{
    let fireTopic = await Topic.find({}).sort({visit_count:-1}).limit(12);;
    let comment = await Topic.find({}).sort({visit_count:-1}).sort({visit_count:-1}).limit(12);
    let zeroReply =  await Topic.find({reply_count:0}).limit(12);
    let activeUser = await User.find({}).sort({score:-1}).limit(16);
    let data ={
        activeUser:activeUser,
        fireTopic:fireTopic,
        comment:comment,
        zeroReply:zeroReply
    }
    return data;
}

exports.topicAddReply=(topicId)=>{
    console.log(topicId)
    return Topic.update({_id:topicId},{$set:{last_reply_at:Date.now()},$inc:{reply_count:1}});
}