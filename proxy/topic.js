const Topic = require('../models').Topic;

/** 创建一个文章
* @{String} title
* @{String} content
* @{ObjectId} author_id
 */
exports.createTopic = (loginName,title,content,image,tab)=>{
    let topic = new Topic();
    topic.loginName = loginName;
    topic.title = title;
    topic.content = content;
    topic.tab = tab;
    topic.image = image;
    return topic.save();
}

