const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

let Schema  = mongoose.Schema;
/*
 * type:
 * reply: xx 回复了你的话题
 * toreply: xx 在话题中回复了你
 * follow: xx 关注了你
 * at: xx ＠了你
 */
var messageSchema = new Schema({
    type: { type: String },
    master_id: { type: ObjectId ,ref:'User'},//自身
    author_id: { type: ObjectId ,ref:'User'},
    topic_id: { type: ObjectId ,ref:'Topic'},
    reply_id: { type: ObjectId ,ref:'User'},
    has_read: { type: Boolean, default: false },
    create_at: { type: Date, default: Date.now }
});

messageSchema.index({master_id: 1, has_read: -1, create_at: -1});

mongoose.model('Message', messageSchema,'message');