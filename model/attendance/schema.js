const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Attendance = new Schema({
    username:{type:String, required:true, dropDups:true, uniqueCaseInsensitive:true},
    name : {type:String, required:true,},
    attend : {type:[{"date":Date, "teacher":String, "units" : Number}]},
    note : {type:[{"date":Date, "note":String}]},
    count: {type:Number, default:0}
});

module.exports = Attendance;