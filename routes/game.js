var express = require('express');
var Room = require('../database/room');
var router = express.Router();

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        var id = req.params.id;

        res.render('play', {
            id: id
        });
    } else {
        res.redirect('/login');
    }
});

router.post('/create', function (req, res) {
    if (req.isAuthenticated()) {
        var title = req.body.title;
        console.log("Request to create new game. title=" + title);

        Room.create(title, function (err, room) {
            if (err) {
                console.log("Failed to create room. room : " + room);
                console.error(err);

                res.status(500).end();
            } else {
                console.log("Room is created. room : " + room);
                res.redirect('/game?id=' + room._id);
            }
        });
    } else {
        res.status(401).end();
    }
});

module.exports = router;