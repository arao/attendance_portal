/*
    login ->{
        return dashboard info for the student in an object
        obj.collection == ($BRANCH$_$YEAROFADDMISSION$) eg(ce_2015)
        obj.username
        obj.password
    }
 */
/*
    attendance ->{
        return the attendance of a student of specified subject or of all subject
        obj.collection == ($SUB$_$BRANCH$_$YEAROFADDMISSION$_$SEM$)
        obj.id (rollnumber of student)
    }
 */

let attendance = require('../model/attendance/operations').db;
let profile = require('../model/profile/operations').db;
let express = require('express');
let router = express.Router();
let log = require('../etc/log');
/* GET home page. */

router.post('/login', function (req, res, next) {
    let obj = req.body.data;
    if(typeof(obj.collection && obj.username && obj.password) === 'undefined'){
        res.JSON({'error' : "wrong data format"});
    }else {
        profile.signin(obj)
            .then(doc=>{
                "use strict";
                res.JSON(doc);
            })
            .catch(err=>{
                "use strict";
                log.error(err);
                res.JSON({ 'error':err.reason });
            })
    }
} );

router.post('/attendance', function (req,res,next) {
   let obj = req.body.data;
   if(typeof(obj.collection && obj.id ) ==='undefined' ){
       res.JSON({'error' : "wrong data format"});
   }
   attendance.getAttendance(obj)
       .then(doc=>{
           "use strict";
           res.JSON(doc);
       })
       .catch(err=>{
           "use strict";
           log.error(err);
           res.JSON({'error': err.reason});
       });
});


module.exports = router;