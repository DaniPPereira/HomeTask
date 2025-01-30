const db = require('../config');  
const User = require('.//UserModel');


db.models = {};
db.models.User = User;
module.exports = db;
