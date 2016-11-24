const mongoose = require('mongoose');

let Schema  = mongoose.Schema;

let userSchema = new Schema({
  name: { type: String},
  loginName: { type: String},
  pass: { type: String },
  email: { type: String},
  city: {type: String},
  url: { type: String },
  score: {type: Number ,default: 0},
  depict: {type:String},
  avatar: {type: Number},
  seal:[], //印章
  update_at: { type: Date, default: Date.now },
  medal:[
      {type: String}
  ]//勋章
});

userSchema.index({loginName: 1}, {unique: true});
userSchema.index({email: 1}, {unique: true});
userSchema.index({score: -1});

userSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
    }
    //新建用户获得铜牌会员
    if(this.medal.length===0){
        this.medal.push('u233');
    }
    next();
});


mongoose.model("User", userSchema, "user");


