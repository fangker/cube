const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

let Schema  = mongoose.Schema;

let topicSchema = new Schema({
    title: { type: String },
    content: { type: String },
    author_id: { type: ObjectId ,ref :'User'},
    top: { type: Boolean, default: false }, // 置顶帖
    good: {type: Boolean, default: false}, // 精华帖
    lock: {type: Boolean, default: false}, // 被锁定主题
    reply_count: { type: Number, default: 0 },
    visit_count: { type: Number, default: 0 },
    collect_count: { type: Number, default: 0 },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    last_reply: { type: ObjectId ,ref :'User'},
    last_reply_at: { type: Date, default: Date.now },
    tab: {type: String},
    imge:{type:String,default: Date.now},  //缩略图
    deleted: {type: Boolean, default: false}

});


topicSchema.index({create_at: -1});
topicSchema.index({top: -1, last_reply_at: -1});
topicSchema.index({author_id: 1, create_at: -1});

mongoose.model('Topic', topicSchema,'topic');

