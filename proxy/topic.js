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
    return topic.save();
}

