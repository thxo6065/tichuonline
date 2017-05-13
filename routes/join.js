var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('join', {
        message: req.flash('joinMessage')
    });
});

router.post('/', passport.authenticate('local-join', {
    successRedirect: '/login',
    failureRedirect: '/join',
    failureFlash: true
}));

module.exports = router;