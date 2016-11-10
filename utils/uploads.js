const path = require('path');
const uuid = require('node-uuid')
const multer = require('koa-multer');

let userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'..\\public\\uploads')
    },
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split(".");
        cb(null,  uuid.v1() + "." + fileFormat[fileFormat.length - 1])
    }
});
let userUpload = multer({ storage: userStorage });

let upload = {
    userUpload : userUpload
}

exports.upload = upload;