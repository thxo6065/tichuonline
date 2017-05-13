var local_login = require('../passport/local/login');

module.exports = function (app, passport) {

    passport.serializeUser(function (user, done) {
        console.log("serializeUser");
        console.dir(user);

        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        console.log("deserializeUser");
        console.dir(user);

        done(null, user);
    });

    passport.use('local-login', local_login);
};