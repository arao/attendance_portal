let express = require('express');
let router = express.Router();
let profile = require('../model/profile/operations');
let db= require('../model/profile/model');
/* GET home page. */
router.get('/', function(req, res, next) {
    let sess = req.session;
    console.log(sess);
    if(sess.profile ){
        if(sess.profile.category === 'teacher'){
            res.redirect('/teacher');
        }else{
            res.redirect('/student');
        }
    }else{
        res.render('index', { title: 'Express' });
    }

});
router.get('/login', function (req, res, next) {
    /*
         render login form
     */
    res.render('register');
});

router.post('/login', function (req, res, next) {

    /*
        perform validation here
     */
    let cat = req.body.username.split("-")[0]==="t"?"teacher":req.body.username.split("-")[2];
    //console.log(req.body.username);

    console.log({collection: cat, username:req.body.username, password:req.body.password});
    profile.getUserByUsername({collection: cat, username:req.body.username, password:req.body.password})
                .then(doc => {
                "use strict";
                console.log(doc);
                let sess = req.session;
                sess.profile = doc;
                sess.profile.category = cat;
                res.redirect('/');
            })
                .catch(err => {
                    "use strict";
                    console.log(err);
                    res.send("err at login");
                })
});

router.get('/logout', function (req, res, next) {
    req.session.destroy(err=>{
        "use strict";
        if(err) console.log(err);
        res.redirect('/');
    })
});

module.exports = router;
