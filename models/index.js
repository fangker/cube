const mongoose = require('mongoose');


//connection
require('./../common/db_connect');
//models
require('./topic');
require('./user');
require('./series');
require('./product');
require('./reply');


exports.User = mongoose.model('User');
exports.Topic = mongoose.model('Topic');
exports.Product = mongoose.model('Product');
exports.Series = mongoose.model('Series');
exports.Series = mongoose.model('Reply');
exports.Series = mongoose.model('Message');

