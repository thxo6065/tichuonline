var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        res.render('play');
    } else {
        res.redirect('/login');
    }
});

router.post('/create', function (req, res) {
    if (req.isAuthenticated()) {
        var roomName = req.body.roomName;
        console.log("Request to create new game. roomName=" + roomName);

        res.redirect('/game');
    } else {
        res.status(401).end();
    }
});

module.exports = router;