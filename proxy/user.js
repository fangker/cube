const User = require('../models').User;


/**根据用户名查找信息
 * @param {String} loginName 用户名
 *
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
 * 
 */
exports.cereatUser = (loginName,name,pass,email,url) =>{
    let user = User(name,loginName,pass,email,url);
   return user.save();
}