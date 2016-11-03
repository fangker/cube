const User = require('../models').User;
const crypto = require('crypto');

/**MD5加密
 * @param{String} content
 * -result {String} hashmsg
 */

function encode (content)=>{
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
 */
exports.cereatUser = (loginName,pass,name) =>{
    let user = User();
    user.loginName=loginName;
    user.pass=encode(pass);
    user.name=name;
   return user.save();
}