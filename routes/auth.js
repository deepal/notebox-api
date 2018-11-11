const express = require('express');
const { passport, initializeGoogleLogin } = require('../modules/auth/oauth');
const user = require('../modules/database/helpers/user');

initializeGoogleLogin((accessToken, refreshToken, profile) => {
    const firstName = profile.name.givenName;
    const lastName = profile.name.familyName;
    const googleProfile = profile;
    const homepageUrl = '/';
    const email = profile.emails[0].value;
    return user.findOrCreateUser({
        firstName,
        lastName,
        googleProfile,
        homepageUrl,
        email
    });
});

const router = express.Router();

router.get('/login/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
}));

router.get('/google/redirect',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/loginFailed',
        failureFlash: true
    }));

module.exports = router;
