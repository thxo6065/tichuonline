var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('login', {
        message: req.flash('loginMessage')
    });
});

router.post('/', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;