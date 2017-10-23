const  mongoose  = require('mongoose');
const client = require('mongodb').MongoClient;
const opt ={useMongoClient: true};
const uri = "mongodb://localhost:27017/Attendance";
mongoose.Promise = Promise;
const log = require('../../etc/log');

//mongoose.connect(uri,opt);

let db = mongoose.createConnection(uri,opt);
/*
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
                console.log("Mongo Driver Collection retrieve from "+uri);
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
    console.log('Mongoose default connection disconnected : '+uri);
});
*/

db.on('connected', function () {
    console.log('Mongoose default connection open to ' + uri);
    client.connect(uri).then(Db => {
        "use strict";
        Db.listCollections().toArray()
            .then(doc => {
                Db.close();
                db.collectionList = [];
                for(let ele of doc){
                    db.collectionList.push(ele.name);
                }
                console.log("Mongo Driver Collection retrieve from "+uri);
            })
            .catch(err => {
                console.log("Failed to get collection list");
                log.error({err: err, reason: "mongodb driver cannot retrieve data from database"});
                db.close();
            });
    });
});

db.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

db.on('disconnected', function () {
    console.log('Mongoose default connection disconnected : '+uri);
});


process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = db;