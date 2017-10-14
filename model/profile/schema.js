const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Profile = new Schema({
    username   : {type:String },
    name       : {type:String },
    password   : {type : String },
    verify     : {type: Boolean, default : false},
    contact    : {
        email  : {type:String},
        mobile : {type:String}
    },
    map        : [{type:String}]
});

module.exports.schema = Profile;