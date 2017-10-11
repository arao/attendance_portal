const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Profile = new Schema({
    id         : {type:String, required:true, dropDups:true, unique:true},
    name       : {type:String, required:true,},
    password   : {type : String, required:true },

    verify     : {type: Boolean, default:false},
    contact    : {
        email  : {type:String, required:true, unique:true},
        mobile : {type:String, required:true, unique:true}
    },
    map        : [{type:String, dropDups:true, unique:true}]
});

module.exports.schema = Profile;