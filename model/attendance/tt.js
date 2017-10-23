let db = require('./config');
let profile = require('./schema').schema;
let mongoose = require('mongoose');
let post = db.model("os_5_ce_2K15", profile , "os_5_ce_2K15");

let n = new post;
n.username = 'a';
n.name = "c";
n.attend = [{date: new Date(), teacher: 't-neelam', units: 2}];
n.note = [];
n.count = 2;
n.save().catch(err=>{
    "use strict";
    console.log(err);
});