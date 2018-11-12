const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const userHelper = require('../database/helpers/user');

function initializeGoogleLogin() {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const googleProfile = profile;
        const homepageUrl = '/';
        const email = profile.emails[0].value;
        userHelper.findOrCreateUser({
            firstName,
            lastName,
            googleProfile,
            homepageUrl,
            email
        }).then((createdUser) => {
            done(null, createdUser);
        }).catch((err) => {
            done(err);
        });
    }));

    return passport;
}

exports.initializeOAuth = () => {
    initializeGoogleLogin();

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
