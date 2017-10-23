const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Profile = new Schema({
    username   : {type:String },
    name       : {type:String },
    password   : {type : String },
    contact    : {
        email  : {type:String},
        mobile : {type:String}
    },
    map        : [{type:String}]
});

module.exports.schema = Profile;