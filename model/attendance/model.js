const mongoose = require('./config');

const schema = require('./schema').schema;

let post = (collection)=>{
    "use strict";
    if ( collection in mongoose.db.collectionName) {
        return Promise.resolve(mongoose.model(collection, schema, collection));
    }else{
        throw {err:"error", reason:"collection not exist"}
    }
} ;

module.exports.post = post;