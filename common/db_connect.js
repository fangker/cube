const config = require('../config');
const mongoose = require('mongoose');

mongoose.connect(config.db);
let db = mongoose.connection;
mongoose.Promise = Promise;
db.once('open',()=> {
  console.log(`mongodb connect success  now！`);
});