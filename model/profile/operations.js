let post = require('./model');
module.exports.getUserByUsername = (obj) => {
    "use strict";
    /*
        obj.collection  (teacher, class_year(2k15))  //everything in small
        obj.username   (teacher id, roll number )
        obj.password

     */
    return post(obj.collection)
        .then((db) => {
            //return db.find({}).then(doc=>{return Promise.resolve(doc)});
            return db.findOne({username: obj.username})
                .then(doc => {
                    if (doc === null) {

                        return Promise.reject({err: doc, reason: "User not exist"});

                    } else if (doc.password !== obj.password) {

                        doc = doc.toObject();
                        delete doc._id;
                        delete doc.username;
                        delete doc.password;
                        delete doc.__v;
                        return Promise.reject({err: " ", reason: "Credential Error"});


                    } else {


                        doc = doc.toObject();
                        delete doc.password;
                        delete doc._id;
                        delete doc._v;
                        return Promise.resolve(doc);


                    }
                })
        })
        .catch(err => {
            return Promise.reject({err: err, reason: "Failed to signin"});
        })
};

module.exports.createUser =  (obj) => {
    "use strict";
    /*
        obj.collection  (teacher, class_year(2k15))  //everything in small
        obj.username   (teacher id, roll number )
        obj.password
        obj.email
        obj.mobile
     */

    return post(obj.collection)
        .then((db) => {
            delete obj.collection;
            let profile = new db;
            //console.log(profile);
            profile.username = obj.username;
            profile.name = obj.name;
            profile.password = obj.password;
            //profile.verify = false;
            profile.contact.email = obj.email;
            profile.contact.mobile = obj.mobile;
            //profile.map = [];

            return profile.save()
                .then(res => {
                    delete res.password;
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject({err: err, reason: "failed to save Profile"})
                })
        })
        .catch(err => {
            return Promise.reject({err: err, reason: "failed to insert data" })
        });
};

module.exports.addclass =  (obj) => {
    "use strict";
    /*
        obj.collection  (teacher, class_year(2k15))  //everything in small
        obj.username   (teacher id, roll number )
        obj. (array containing classes in which student reads)
     */

    return post(obj.collection)
        .then((db) => {
           return db.update({username: obj.username}, {$addToSet: {map: {$each: obj.class}}})
                .then(doc => {
                    if (doc = null) {
                        return Promise.reject( {err: doc, reason: "value not exist"});
                    } else {
                        return Promise.resolve(doc);
                    }
                })
                .catch(err => {
                    return Promise.reject({err: err, reason: "failed to insert new map"});
                })
        })
        .catch(err => {
            return Promise.reject({err: err, reason: "failed to connect the collection"});
        });
};
