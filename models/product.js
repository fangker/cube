const mongoose = require('mongoose');
let ObjectId=mongoose.Schema.Types.ObjectId;

let Schema  = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String},
    series: {type: ObjectId, ref :'Series'}, //系列
    grade: {type: Number},  //评分
    product: {type: String, default:'earphone'},//产品类型
    type: {type: String},//标识类型
    depict: {type :String, default: ''},  //描述
    num: {type: String, default: ''},  //数量
    price: {type :String, default: ''},   //价格
    create_at: { type: Date, default: Date.now },
    is_sale: {type:String, default:false},
    author_id: {type: ObjectId, ref:'User'}

})

productSchema.index({name: 1});
productSchema.index({author_id: 1, create_at: -1});

mongoose.model('Product', productSchema,'product');