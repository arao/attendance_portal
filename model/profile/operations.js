let post = require('./model').post();

let signin = (obj)=>{
    "use strict";
    /*
        obj.collection  (teacher, class_year(2k15))  //everything in small
        obj.id   (teacher id, roll number )
        obj.password

     */

    return Promise.resolve(post(obj.collection)
        .then((db)=>{
            db.findOne({id: obj.id})
           .then(doc=>{
           if(doc = null) {
               throw {err:doc, reason:"value not exist"};
           }else if(doc.password !== obj.password){
               delete doc.id;
               delete doc.password;
               throw {err:doc, reason:"Credential Error"}
           }else{
               return Promise.resolve(doc);
           }
       })
    })
        .catch(err=>{throw {err: err, reason : "failed to connect the collection"}})
)};

let signup = (obj)=>{
    "use strict";
    /*
        obj.collection  (teacher, class_year(2k15))  //everything in small
        obj.id   (teacher id, roll number )
        obj.password
        obj.verify
        obj.email
        obj.mobile
     */

    return Promise.resolve(post(obj.collection)
        .then((db)=>{
       let profile = new db;
       profile.id = obj.id;
       profile.name =obj.name;
       profile.password = obj.password;
       profile.verify = false;
       profile.contact.email = obj.email;
       profile.contact.mobile = obj.mobile;
       profile.save().then(res=>{
            delete res.password;
            return Promise.resolve(res);
       }, err=>{ throw {err: err, reason : "failed to insert new profile"}})
           .catch(err=>{throw {err: err, reason : "failed to insert new profile"}})
    })
        .catch(err=>{throw {err: err, reason : "failed to connect the collection"}}));

};

let map = (obj)=>{
    "use strict";
    /*
        obj.collection  (teacher, class_year(2k15))  //everything in small
        obj.id   (teacher id, roll number )
        obj. (array containing classes in which student reads)
     */

    return Promise.resolve(post(obj.collection)
        .then((db)=>{
            db.update({id: obj.id},{$addToSet:{map:{$each:obj.class}}})
                .then(doc=>{
                if(doc = null) {
                    throw {err:doc, reason:"value not exist"};
                }else{
                    return Promise.resolve(doc);
                }
            })
                .catch(err=>{throw {err: err, reason : "failed to insert new map"}})
        })
        .catch(err=>{throw {err: err, reason : "failed to connect the collection"}}));
};