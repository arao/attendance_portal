let attendance = require('../model/attendance/operations');
let profile = require('../model/profile/operations');
let express = require('express');
let router = express.Router();
let log = require('../etc/log');

router.get('/', function (req,res, next) {
    /*
        student profile goes here
     */
    let session  = req.session;
    if(session.profile){
        res.send(session.profile);
    }else {
        res.redirect('/');
    }
});

module.exports = router;