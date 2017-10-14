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
let profile = require('../model/profile/operations');
let express = require('express');
let router = express.Router();
let log = require('../etc/log');
/* GET home page. */

// Register
router.get('/register', function(req, res){
    res.render('register');
});

// Login
router.get('/login', function(req, res){
    res.render('login');
});


router.post('/login', function (req, res, next) {
    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;
    let t = username.split('-');
    let branch = t[0], rollno = t[1], batch = t[2];
    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    req.checkBody('username', 'username not valid').equal(branch+"-"+rollno+"-"+batch);
    let errors = req.validationErrors();

    if(errors){
        res.render('register',{
            errors:errors
        });
    } else {
        profile.createUser({
            collections : branch+"_"+batch,
            username: username,
            password: password,
            name : name,
            email: email,
            mobile : 7979797987
        })

        let newUser = new User({
            name: name,
            email:email,
            username: username,
            password: password
        });

        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'You are registered and can now login');

        res.redirect('/users/login');
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