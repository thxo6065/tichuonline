var mariadb = require('../database/mariadb');

module.exports = function (email, password, callback) {
    mariadb.get(function (err, con) {
        if (err) {
            if (con) {
                con.release();
            }
            callback(err);
            return;
        }

        var sql = "INSERT INTO account SET ?";
        var data = {
            email: email,
            password: password
        };

        var exec = con.query(sql, data, function (err, result) {
            if (con) {
                con.release();
            }
            console.log("[insertAccount] SQL : " + exec.sql);

            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    });
};