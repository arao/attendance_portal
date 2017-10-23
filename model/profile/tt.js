let db = require('./config');
let profile = require('./schema').schema;

let post = db.model("2K15", profile , "2K15");

let n = new post;
n.username = "ce-2672-2k15";
n.password = "1";
n.name = "aashif";
n.contact.email="kjsadnfkj@lknldfs.com";
n.contact.mobile="68468";
n.map = ["os_5_ce_2015", "ada_5_ce_2015"];
n.save()
    .then(doc=>{
        "use strict";
        console.log(doc);
    })
.catch(err=>{
    "use strict";
    console.log(err);
});