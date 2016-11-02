const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

let Schema  = mongoose.Schema;

var messageSchema = new Schema({
    type: { type: String },
    master_id: { type: ObjectId},
    author_id: { type: ObjectId },
    topic_id: { type: ObjectId },
    reply_id: { type: ObjectId },
    has_read: { type: Boolean, default: false },
    create_at: { type: Date, default: Date.now }
});

messageSchema.index({master_id: 1, has_read: -1, create_at: -1});

mongoose.model('Message', messageSchema,'message');