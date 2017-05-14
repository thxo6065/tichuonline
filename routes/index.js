var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/lobby');
    } else {
        res.render('cover');
    }
});

module.exports = router;