const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.initializeGoogleLogin = (onLogin) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        onLogin(accessToken, refreshToken, profile)
            .then(() => {
                done(null, profile);
            })
            .catch((err) => {
                done(err);
            });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        done(null, { id });
    });

    return passport;
};

exports.passport = passport;
