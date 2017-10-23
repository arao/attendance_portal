const mongoose = require('./config').mongo;
let collectionList = require('./config').collectionlist;

const schema = require('./schema').schema;

let post = (collection)=>{
    "use strict";
    console.log(collectionList);
    if(typeof(collectionList) === 'undefined'){
        return Promise.reject({err:"cannot fetch collection list", reason:"mongoose.collection not exist"});
    }

    if ( collectionList.includes(collection) ) {
        return Promise.resolve(mongoose.model(collection, schema, collection));
    }else{
        return Promise.reject({err:"error", reason:"collection not exist"});
    }

} ;
/*
function t() {
    console.log(mongoose.collectionList);
}

setTimeout(t, 1000);
*/
module.exports = post;