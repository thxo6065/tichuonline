var LocalStrategy = require('passport-local').Strategy;
var mariadb = require('../../database/mariadb');

function doLogin(email, password, callback) {
    mariadb.get(function (err, con) {
        if (err) {
            console.log("Failed to get mariadb.");
            console.error(err);
            con.release();
            return;
        }

        var sql = "SELECT id, email, username FROM account WHERE email=? AND password=?";
        var data = [email, password];

        var exec = con.query(sql, data, function (err, result) {
            con.release();
            console.log("[doLogin] SQL : " + exec.sql);

            if (err) {
                callback(err, null);
            } else {
                if (result.length > 0) {
                    callback(null, {
                        id: result[0].id,
                        email: result[0].email,
                        username: result[0].username
                    });
                } else {
                    callback(null, null);
                }
            }
        });
    });
}

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    doLogin(email, password, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, req.flash('loginMessage', "올바른 계정이 없습니다."));
        }

        return done(null, user);
    });
});