var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        res.render('play');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;