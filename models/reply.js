
const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let Schema  = mongoose.Schema;

let replySchema = new Schema({
    content: { type: String },
    topic_id: { type: ObjectId ,ref: 'Topic'}, //话题Id
    author_id: { type: ObjectId ,ref: 'User'}, //作者Id
    reply_id: { type: ObjectId ,ref: 'User'},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    ups:[ObjectId],
    deleted: {type: Boolean, default: false} //删除需要保留概要
})

replySchema.index({topic_id: 1});
replySchema.index({author_id: 1, create_at: -1});

mongoose.model('Reply', replySchema,'reply');

