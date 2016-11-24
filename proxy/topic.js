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
exports.getTopicMessage = (topic) =>{
    console.log(topic)
    //没过滤字段
   return Topic.findOne({_id:`${topic}`}).populate('author_id') .exec();
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
    let rtab = null || tab;
    return Topic.count({});
}
