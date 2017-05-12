var express = require('express');
var mariadb = require('../database/mariadb');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('join');
});

router.post('/', function (req, res) {
    mariadb.get(function (err, con) {
        if (err) {
            console.log("Failed to get mariadb.");
            console.error(err);
            con.release();
            return;
        }

        var email = req.body.email;
        var password = req.body.password;

        var sql = "INSERT INTO account SET ?";
        var data = {
            email: email,
            password: password;
        };

        var exec = con.query(sql, data, function (err, result) {
            con.release();
            console.log("SQL : " + exec.sql);

            if (err) {
                console.log("Failed to insert new account.");
                console.error(err);
                res.status(500).redirect('/join');
            } else {
                res.status(200).redirect('/');
            }
        });
    });
});

module.exports = router;