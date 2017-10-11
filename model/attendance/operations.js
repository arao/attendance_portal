let post = require('./model').post();

let addAttendance = obj=>{
    "use strict";
    /*
        obj.collection (name of the class)
        obj.teacher_id (id of teacher which is taking attendance)
        obj.count  (number of attendance)
        obj.date   (date of the attendance)
        obj.student ( id of students which are present)
     */

    return Promise.resolve(post(obj.collection)
        .then(db=>{
            if(typeof(obj.student) === "string" ){
                obj.student = [obj.student];
            }
            let failed = [];
            let successful = [];
            let promisearray = [];
            for(let student of obj.student){
                promisearray.push(db.updateOne({id:student},
                    {
                        $addToSet:{attend:{date:obj.date, teacher: obj.teacher_id, units: obj.count}},
                        $inc:{count:obj.count}
                    }
                )
                    .then(doc=>{successful.push(doc)},err=>{failed.push({student_id:student, err:err, reason: "failed to add attendance"})})
                    .catch(err=>{failed.push({student_id:student, err:err, reason: "failed to add attendance"})}));
            }

            Promise.all(promisearray)
                .then(data=>{return Promise.resolve({successful : successful, failed: failed, data: data})})
                .catch(err => { throw {err:err, reason :"error during updating attendance", failed:failed, successful:successful}});

        })
        .catch(err=>{throw {err: err, reason : "failed to connect the collection"}})
)};

let getAttendance = obj=>{
    "use strict";
    /*
        obj.collection
        obj.id
     */
    return Promise.resolve(post(collection).then(db=>{
        db.findOne({id:obj.id})
            .then(doc=> {
                    if (doc === null) {
                        throw {err: "Invalid roll number or collection", reason: "find get nothing"}
                    }
                    return Promise.resolve(doc);
                }
            ,err=>{throw {err: err, reason:"find one rejected"}})
            .catch(err=>{throw {err: err, reason:"find one get err"}});
        })
    )
};

