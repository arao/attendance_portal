/*

    !$YEAROFADMISSION$ === $BATCH$

    login->{
        return dashboard attribute along with the list of class which teacher can access
        obj.collection = teacher
        obj.username
        obj.password
    }

    attendance->{
        save the attendance of the students in db
        obj.collection ($SUB$_$BRANCH$_$YEAROFADDMISSION$_$SEM$)
        obj.teacher_id (id of teacher which is taking attendance)
        obj.count  (number of attendance)
        obj.date   (date of the attendance)
        obj.student ( array of student id which are present)
    }

    register->{
        return entire register of the class
        obj.collection  ($SUB$_$BRANCH$_$YEAROFADDMISSION$_$SEM$)
    }
 */

let attendance = require('../model/attendance/operations').db;
let profile = require('../model/profile/operations').db;
let express = require('express');
let router = express.Router();
let log = require('../etc/log');

router.post('/login', function (req, res, next) {
    let obj = req.body.data;
    obj.collection = 'teacher';
    if(typeof(obj.username && obj.password) === 'undefined'){
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


router.post('/register', function(req,res,next){
    "use strict";
    log.warning("teacher requested register ");
    log.info(obj);
    if(typeof(obj.collection&&obj.username && obj.password) === 'undefined') {
        res.json({'error': "wrong data format"});
    }
    attendance.getAttendance(obj)
        .then(doc=>{
            res.json(doc)
        })
        .catch(err=>{
            log.error(err);
            res.JSON({'error' : err.reason});
        })
});

router.post('/attendance', function (req, res, err) {
        if(typeof(obj.collection && obj.teacher_id && obj.count && obj.date && obj.student ) === 'undefined'){
            res.json({'error': "wrong data format"});
        }
        log.info("a new request for attendance");
        log.info(obj);

        attendance.addAttendance(obj)
            .then(data=>{
                "use strict";
                log.error({failed: "failed to insert", students: data.failed});
                log.info({sucessful: "sucessfull updated ", student : data.sucessful});
                log.error(data.data);
                res.json({sucessful: {
                                        count: data.sucessful.length,
                                        student: data.sucessful
                                    },
                            failed: {
                                        count : data.failed.length,
                                        student : data.failed
                                    }
                    });
            })
            .catch(err=>{
                "use strict";
                log.err(err.reason);
                log.info(err);
                res.json({error : err.reason,
                    sucessful: {
                        count: data.sucessful.length,
                        student: err.sucessful
                    },
                    failed: {
                        count : data.failed.length,
                        student : err.failed
                    }
                })
            })
});

