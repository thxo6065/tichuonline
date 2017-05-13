var LocalStrategy = require('passport-local').Strategy;
var mariadb = require('../../database/mariadb');

var findAccount = require('../../account/find');
var insertAccount = require('../../account/insert');

function doJoin(email, password, callback) {
    findAccount(email, function (err, exists) {
        if (err) {
            console.log("Failed to find account. email=" + email);
            console.error(err);

            callback(err);
            return;
        }

        if (exists) {
            callback(null, null);
        } else {
            insertAccount(email, password, function (err) {
                if (err) {
                    console.log("Failed to insert account. email=" + email);
                    console.error(err);

                    callback(err);
                } else {
                    callback(null, email);
                }
            });
        }
    });
}

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    doJoin(email, password, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, req.flash('joinMessage', "회원 가입을 실패하였습니다."));
        }

        return done(null, user);
    });
});