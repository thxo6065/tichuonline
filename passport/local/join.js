var LocalStrategy = require('passport-local').Strategy;
var mariadb = require('../../database/mariadb');

var findAccount = require('../../account/find');
var insertAccount = require('../../account/insert');
var findUsername = require('../../username/find');

function doJoin(user, callback) {
    findAccount(user.email, function (err, exists) {
        if (err) {
            console.log("Failed to find account. email=" + user.email);
            callback(err);
            return;
        }

        if (exists) {
            callback(null, null);
        } else {
            findUsername(user.username, function (err, exists) {
                if (err) {
                    console.log("Failed to find username. username=" + user.username);
                    callback(err);
                    return;
                }

                insertAccount(user, function (err) {
                    if (err) {
                        console.log("Failed to insert account. email=" + user.email);
                        callback(err);
                    } else {
                        callback(null, user);
                    }
                });
            });
        }
    });
}

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    doJoin({
        email: email,
        password: password,
        username: req.body['username']
    }, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, req.flash('joinMessage', "회원 가입을 실패하였습니다."));
        }

        return done(null, user);
    });
});