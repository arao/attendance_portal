let express = require('express');
let random = require('crypto');
let router = express.Router();
let profile = require('../model/profile/operations');
let attendance = require('../model/attendance/operations');

router.post('/authenticate', (req, res, next)=>{
    "use strict";
    //let data = JSON.parse(req.body);
    let data = req.body;
    let category = data.username.split("-");
    console.log(category);
    if(category[0] === 't'){
        category = "teacher";
    }else {
        category = category[0]+"_"+category[2];
    }

    profile.getUserByUsername({collection: category, username: data.username, password: data.password })
        .then(obj=>{
            let token = random.randomBytes(64).toString('hex');
            console.log(obj);
            res.json({profile:obj, token: token, iserror: false});
        })
        .catch(err=>{
            console.log(err);
            res.json({iserror: true, err: err.err, reason: err.reason});
        })

});

module.exports = router;