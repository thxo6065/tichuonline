var mariadb = require('../database/mariadb');

module.exports = function (email, callback) {
    mariadb.get(function (err, con) {
        if (err) {
            if (con) {
                con.release();
            }
            callback(err);
            return;
        }

        var sql = "SELECT email FROM account WHERE email=?";
        var data = [email];

        var exec = con.query(sql, data, function (err, result) {
            if (con) {
                con.release();
            }
            console.log("[findAccount] SQL : " + exec.sql);

            if (err) {
                callback(err);
            } else {
                callback(null, (result.length > 0));
            }
        });
    });
};