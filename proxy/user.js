const User = require('../models').User;
const crypto = require('crypto');

/**MD5加密
 * @param{String} content
 * -result {String} hashmsg
 */

function encode (content){
    let hasher=crypto.createHash("md5");
    hasher.update(content);
    return hasher.digest('hex');//hashmsg为加密之后的数据
}



/**根据用户名查找信息
 * @param {String} loginName 用户名
 * -data  [Array]  数组结果
*/
exports.getUserByLoginName = (loginName)=>{
 return User.findOne({loginName: new RegExp(`^${loginName}$`, "i")}).exec();
}

/**根据Eamil获得用户信息
 * @param {String} email 邮件
 * 
 */
exports.getUserByEmail = (email)=> {
 return User.findOne({email:email}).exec();
}

/**创建用户
 * @param {String} loginName  用户名
 * @param {String} pass  密码
 * @param {String} name  昵称
 * @param {String} email Email
 * @
 */
exports.cereatUser = (loginName,pass,name,email,image) =>{
    let user = User();
    user.avatar=image;
    user.loginName=loginName;
    user.pass=encode(pass);
    user.name=name;
    user.email=email;
   return user.save();
}
/**通过ID查找用户
 * @param {String} loginName  用户名
 */
exports.getUserbyLoginName = (loginName) =>{
    return User.findOne({loginName:loginName}).exec();
}
/**通过SID查找用户
 * @param {Object} SID  用户名SID
 */
exports.getUserbySID = (SID) =>{
    return User.findOne({_id:SID});
}
/*
*验证用户登录情况
* @param {Object} 成功或失败
 */
exports.checkLogin=async(login,pass)=>{
return  await User.findOne({$or: [{loginName:login},{email:login}],$and: [{pass:encode(pass)}]});

}
/*
 *个人信息设置
 * @param {String} email 邮件
 * @param {String} name 姓名
 * @param {String} city 城市
 * @param {String} depict city
 */
exports.setUserInfo=(loginName,email,name,city,depict)=> {
    console.log(loginName, email, name, city, depict)
   return User.update({loginName:loginName},{$set:{email:email,name:name,city:city,depict:depict}})
}