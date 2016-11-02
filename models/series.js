const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

let Schema  = mongoose.Schema;

let seriesSchema = new Schema({
     brand: {type: String},
     product: [{type:ObjectId ,ref :'Product'}],
     iden: {type: String}, //标识码
     author_id: [{type: ObjectId ,ref :'User'}],
     depict: {type: String},
     create_at: { type: Date, default: Date.now }
})

seriesSchema.index({name: 1});
seriesSchema.index({author_id: 1, create_at: -1});


mongoose.model('Series', seriesSchema,'series');