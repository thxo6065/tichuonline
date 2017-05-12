var express = require('express');
var mariadb = require('../database/mariadb');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('join');
});

router.post('/', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    findAccount(email, function (err, exists) {
        if (err) {
            console.log("Failed to findAccount.");
            console.error(err);

            res.status(500).redirect('/join');
            return;
        }

        if (exists) {
            res.status(200).redirect('/join');
        } else {
            insertAccount(email, password, function (err) {
                if (err) {
                    console.log("Failed to insert new account.");
                    console.error(err);

                    res.status(500).redirect('/join');
                } else {
                    console.log("New account was inserted. email=" + email);

                    res.status(200).redirect('/');
                }
            });
        }
    });
});

function findAccount(email, callback) {
    mariadb.get(function (err, con) {
        if (err) {
            console.log("Failed to get mariadb.");
            console.error(err);
            con.release();
            return;
        }

        var sql = "SELECT email FROM account WHERE email=?";
        var data = [email];

        var exec = con.query(sql, data, function (err, result) {
            con.release();
            console.log("[checkAccountExists] SQL : " + exec.sql);

            if (err) {
                callback(err, null);
            } else {
                callback(err, (result.length > 0));
            }
        });
    });
};

function insertAccount(email, password, callback) {
    mariadb.get(function (err, con) {
        if (err) {
            console.log("Failed to get mariadb.");
            console.error(err);
            con.release();
            return;
        }

        var sql = "INSERT INTO account SET ?";
        var data = {
            email: email,
            password: password
        };

        var exec = con.query(sql, data, function (err, result) {
            con.release();
            console.log("[insertAccount] SQL : " + exec.sql);

            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    });
}

module.exports = router;