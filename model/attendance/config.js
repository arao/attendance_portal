const  mongoose  = require('mongoose');
const opt ={useMongoClient: true};
const uri = "mongodb://localhost:27017/attendance";

mongoose.connect(uri,opt)(res=>{},err=>{throw err});

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + uri);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected : attendance');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


module.exports.db = mongoose;