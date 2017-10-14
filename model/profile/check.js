let db = require('./operations');

console.log(db);


let obj = {};
obj.collection = "teacher";
obj.password = '1111';

let ob1 = {};
ob1.collection = "teacher";
ob1.username = 'gdf';
ob1.name = 'gdfi';
ob1.password = '1ggg';
ob1.email = "sogfdhutiya.com";
ob1.mobile = 454455;
/*
setTimeout(()=>{
    "use strict";
    db.signup(ob1).then(res=>{
        console.log("inserted data");
        console.log(res);
    })
        .catch(err=>{console.log(err)});
}, 1000);

setTimeout(()=> {
    db.signin(ob1).then(res => {
        "use strict";
        console.log("reterived data");
        console.log(res);
    });
}, 2000);
*/