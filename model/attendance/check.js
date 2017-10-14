const attendance = require('./operations').db;
let util = require('util');

setTimeout(()=> {
    attendance.addAttendance({
        collection: "ada_ce_2015_5",
        teacher_id: 'sonam gupta',
        count: 1,
        date: new Date(),
        student: ['ce-2671-2k15','ce-2672-2k15']
    }).then(res => {
        "use strict";
        console.log(res);
        })
        .catch(err => {
            "use strict";
            console.log(res);
        });
}, 1000);


setTimeout(()=>{
    "use strict";
    attendance.getAttendance({
        collection: "ada_ce_2015_5",
        username: 'ce-2671-2k15'
    })
        .then(res=>{
        console.log(res);
    })
        .catch(err=>{
            console.log(err);
        })
}, 1000);


setTimeout(()=>{
    "use strict";
    attendance.register({
        collection: "ada_ce_2015_5",
        //username: 'ce-2671-2k15'
    })
        .then(res=>{
            console.log(JSON.stringify(res));
        })
        .catch(err=>{
            console.log(err);
        })
}, 1000);
