const fs = require("fs");
const path = require("path")

//读取文件存储数组
let fileArr = [];


//配置远程路径
let avatarPath = path.resolve(process.cwd(), '../public/avatar/default');

function getAvatar() {
    return new Promise(function (resolve) {
        fs.readdir(avatarPath, function (err, files) {
            if (err) {
                console.log(err);
                return;
            }
            const count = files.length;
            for (let i = 0; i < count; i++) {
                fs.stat(path.join(avatarPath, files[i]), function (err, stats) {
                    if (stats.isFile()) {
                        fileArr.push(files[i]);
                        if (i === count - 1) {
                            resolve(fileArr)
                        }
                    }
                });
            }
        })
    })
}


module.exports=getAvatar;
