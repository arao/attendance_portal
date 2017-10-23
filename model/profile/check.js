let db = require('./operations');
let DB = require('./model');


let obj = {
    username: "t-neelam",
    name: "neelam",
    password: "1234567",
    contact: {email: "jaiho@gmail.com", mobile: "9449449494"} ,
    map : ["os_ce_2015_5"],
    collection : "teacher"
};

/*
let n =()=> {
    DB('teacher')
        .then(res => {
            "use strict";
            res.find({}).then(doc => {
                console.log(doc);
            })
        });
};

setTimeout(n, 1000);
*/

/*
setTimeout(()=> {

    db.createUser(obj)
        .then(res => {
            "use strict";
            console.log(res);

        })
        .catch(err => {
            "use strict";
            console.log(err);
        });
    //obj.class = obj.map;
    //db.addclass(obj);
    }, 1000);

setTimeout(()=>{
    "use strict";
    db.signup(ob1).then(res=>{
        console.log("inserted data");
        console.log(res);
    })
        .catch(err=>{console.log(err)});
}, 1000);
*/
setTimeout(()=> {
    db.getUserByUsername({collection: "teacher", username:"t-neelam", password:"1"}).then(res => {
        "use strict";
        console.log(res);
    });
}, 2000);
