let db = require('./operations').profile;


let obj = {};
obj.collection = "teacher";
obj.password = '1111';

let ob1 = {};
ob1.collection = "teacher";
ob1.username = 'soaanal';
ob1.name = 'Sonali';
ob1.password = '1111';
ob1.email = "soalichutiyahai@chutiya.com";
ob1.mobile = 123;

setTimeout(()=>{
    "use strict";
    db.signup(ob1).then(res=>{
        console.log(res);
    })
        .catch(err=>{console.log(err)});
}, 1000);

/*setTimeout(()=> {
    db.signin(obj).then(res => {
        "use strict";
        console.log(res);
    });
}, 2000);*/