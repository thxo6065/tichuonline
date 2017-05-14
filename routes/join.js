var express = require('express');
var passport = require('passport');
var findAccount = require('../account/find');

var router = express.Router();

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('join', {
            message: req.flash('joinMessage')
        });
    }
});

router.post('/', passport.authenticate('local-join', {
    successRedirect: '/login',
    failureRedirect: '/join',
    failureFlash: true
}));

router.get('/find/:email', function (req, res) {
    var email = req.params.email;

    findAccount(email, function (err, exists) {
        if (err) {
            res.status(500).end();
        } else {
            res.status(200).json({
                exists: exists
            }).end();
        }
    });
});

module.exports = router;