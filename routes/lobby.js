var express = require('express');
var Room = require('../database/room');
var router = express.Router();

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        Room.findAll(function (err, rooms) {
            if (err) {
                console.log("Failed to find all rooms.");
                console.error(err);

                res.status(500).end();
            } else {
                res.render('lobby', {
                    rooms: rooms
                });
            }
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;