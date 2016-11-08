const topic = require('../proxy/topic');

exports.add = async(ctx,next)=>{
    console.log(ctx.request.body);
    let {title,content,tab} = ctx.request.body;
    let c=await topic.createTopic('禽兽一只',title,content,tab,'1');
     console.log(c);
};