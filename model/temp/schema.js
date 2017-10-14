const mongoose = require('./config').db;
let Schema = mongoose.Schema;

const temp = new Schema({
    _id         : {type:String, required:true, dropDups:true, unique:true},
    username        : {type: String, required:true, dropDups:true, unique: true},
    collection : {type:String, required:true}
});

module.exports.schema = temp;