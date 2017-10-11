const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Attendance = new Schema({
    roll_no:{type:String, required:true, dropDups:true, unique:true},
    name : {type:String, required:true,},
    attend : {type:[{"date":Date, "teacher":String, "units" : Number}], required:true},
    note : {type:[{"date":Date, "note":String}]},
    count: {type:Number, default:0}
});

module.exports.schema = Attendance;