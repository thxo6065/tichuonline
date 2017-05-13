var LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    console.log("Called login-local passport. email=" + email);

    done(true);
});