const passport = require('passport');
const googleAuth = require('./google.auth');
const userHelper = require('../../database/helpers/user.helper');

exports.initializeAuthModule = () => {
    googleAuth();

    passport.serializeUser((user, done) => {
        done(null, user.id.toString());
    });

    passport.deserializeUser((id, done) => {
        userHelper.getUser({ id })
            .then((user) => {
                done(null, user);
            }).catch((err) => {
                done(err);
            });
    });
};

exports.passport = passport;
