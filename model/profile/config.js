const  mongoose  = require('mongoose');
const client = require('mongodb').MongoClient;
const opt ={useMongoClient: true};
const uri = "mongodb://localhost:27017/Profile";
mongoose.Promise = Promise;
const log = require('../../etc/log');

mongoose.connect(uri,opt);//(res=>{},err=>{throw err});

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + uri);
    client.connect(uri).then(db => {
        "use strict";
        db.listCollections().toArray()
            .then(doc => {
                db.close();
                mongoose.collectionList = [];
                for(let ele of doc){
                    mongoose.collectionList.push(ele.name);
                }
                console.log("Mongo Driver Collection retrieve from : "+uri);
            })
            .catch(err => {
                console.log("Failed to get collection list");
                log.error({err: err, reason: "mongodb driver cannot retrieve data from database"});
                db.close();
            });
    });
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

module.exports = mongoose;