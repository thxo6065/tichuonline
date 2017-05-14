var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    // res.send('Hi, post');
    // var room_name = req.param('room_name');
    console.log(req.param('room_name'), req.email);
    res.redirect('/play');
});

module.exports = router;