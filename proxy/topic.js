const Topic = require('../models').Topic;

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
    return  topic.save();
}
/** 根据文章ID获取文章内容
 * @{String} topicID 话题ID
 */
exports.getTopicMessage = (topicId) =>{
   return Topic.findByIdAndUpdate({_id:`${topicId}`},{'$inc':{'visit_count':-1}}, {new: true}).populate('author_id').exec();
}
/** topicList 页面展示
 * @returns {Array}
 */
exports.getTopicList = (p) => {
    return Topic.find({},{content:0})
        .skip((p-1)*20).limit(20).sort({update_at: -1})
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
exports.getReplyPage = (sid) => {
    return Topic.find({_id:sid},{reply_count:1});
}
