const client = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/Profile";

let mongoose = {};

client.connect(uri).then(db => {
    "use strict";
    db.listCollections().toArray()
        .then(doc => {
            db.close();
            mongoose.collectionList = [];
            for(let ele of doc){
                mongoose.collectionList.push(ele.name);
            }
            console.log(mongoose.collectionList);
            console.log("Mongo Driver Collection retrieve");
        })
        .catch(err => {
            console.log("Failed to get collection list");
            log.error({err: err, reason: "mongodb driver cannot retrieve data from database"});
            db.close();
        });
});