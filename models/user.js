const mongoose = require('mongoose');

let Schema  = mongoose.Schema;

let userSchema = new Schema({
  name: { type: String},
  loginName: { type: String},
  pass: { type: String },
  email: { type: String},
  url: { type: String },
  score: {type: Number ,default: 0},
  update_at: { type: Date, default: Date.now },
});

userSchema.index({loginname: 1}, {unique: true});
userSchema.index({email: 1}, {unique: true});
userSchema.index({score: -1});

userSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});


mongoose.model("User", userSchema, "user");


