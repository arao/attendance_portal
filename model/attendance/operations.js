let post = require('./model').post;

let attn = {

    attendance : obj=>{
        "use strict";
        /*
           obj.collection (name of the class)
           obj.teacher_id (id of teacher which is taking attendance)
           obj.count  (number of attendance)
           obj.date   (date of the attendance)
           obj.student ( id of students which are present)
        */

        return post(obj.collection)
            .then(db=>{
                return db.updateOne({username:obj.student}, {
                    $addToSet: {attend: {date: obj.date, teacher: obj.teacher_id, units: obj.count}},
                    $inc: {count: obj.count}
                })
                    .then(doc=>{
                        return Promise.resolve(doc);
                    })
                    .catch(err=>{
                        return Promise.reject({err: err, reason: "failed to update"});
                    })
            })
            .catch(err=>{
                return Promise.reject({err: err, reason:"cannot get db access"});
            });
    },

    addAttendance: obj => {
        "use strict";

        //    obj.collection (name of the class)
          //  obj.teacher_id (id of teacher which is taking attendance)
            //obj.count  (number of attendance)
        //    obj.date   (date of the attendance)
          //  obj.student ( id of students which are present)


        return post(obj.collection)
            .then(db => {
                if (typeof(obj.student) === "string") {
                    obj.student = [obj.student];
                }
                let failed = [];
                let successful = [];
                let promisearray = [];
                for (let student of obj.student) {
                    promisearray.push(db.updateOne({username: student},
                        {
                            $addToSet: {attend: {date: obj.date, teacher: obj.teacher_id, units: obj.count}},
                            $inc: {count: obj.count}
                        })
                        .then(doc => {
                            successful.push(doc)
                        })
                        .catch(err => {
                            failed.push({student_id: student, err: err, reason: "failed to add attendance"})
                        }));
                }

                return Promise.all(promisearray)
                    .then(data => {
                        return Promise.resolve({successful: successful, failed: failed, data: data})
                    })
                    .catch(err => {
                        Promise.reject({
                            err: err,
                            reason: "error during updating attendance",
                            failed: failed,
                            successful: successful
                        })
                    });
            })
            .catch(err => {
                return Promise.reject( {err: err, reason: "failed to connect the collection"} );
            });
    },

    getAttendance: obj => {
        "use strict";

          //  obj.collection
         //   obj.username

        return post(obj.collection).then(db => {
                return db.findOne({username: obj.username})
                    .then(doc => {
                            if (doc === null) {
                                return Promise.reject ({doc:doc, err: "Invalid roll number", reason: "find  nothing"});
                            }
                            else{
                                doc = doc.toObject();
                                delete (doc._id);
                                for(let element of doc.attend){
                                    delete (element._id);
                                }
                                return Promise.resolve(doc);
                            }

                        })
                    .catch(err => {
                        return Promise.reject({err: err, reason: "find one get err"})
                    });
            });
    },

    register: obj => {
        "use strict";

            //return the register of a class
            //obj.collection

        return post(obj.collection).then(db => {
                return db.find({})
                    .then(Doc => {
                        if (Doc === null) {
                            return Promise.reject({
                                err: "Invalid roll number or collection",
                                reason: "find get nothing"
                            })
                        }
                        //Doc = Doc.toObject();
                        let dooc = [];
                        for(let doc of Doc) {
                            doc = doc.toObject();
                            delete (doc._id);
                            for (let element of doc.attend) {
                                delete (element._id);
                            }
                            dooc.push(doc);
                        }

                        return Promise.resolve(dooc);
                    })
                    .catch(err => {
                        return Promise.reject({err: err, reason: "find register get err"})
                    });
            })
    }

};
module.exports.db =attn;