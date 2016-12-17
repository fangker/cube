
const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let Schema  = mongoose.Schema;

let replySchema = new Schema({
    content: { type: String },
    topic_id: { type: ObjectId ,ref: 'Topic'}, //话题Id
    toreply_id:{ type: ObjectId ,ref: 'Reply'},//被回复topicId
    author_id: { type: ObjectId ,ref: 'User'}, //被回复Id作者
    reply_id: { type: ObjectId ,ref: 'User'},//回复主题Id
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    ups:[ObjectId],
    ups_count:{type:Number,default:0},
    deleted: {type: Boolean, default: false} //删除需要保留概要
})

replySchema.index({topic_id: 1});
replySchema.index({author_id: 1,  create_at: -1});

mongoose.model('Reply', replySchema,'reply');

