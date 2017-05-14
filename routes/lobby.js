var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        res.render('lobby');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;