const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    })
);

router.get('/google/redirect',
    passport.authenticate('google', {
        successRedirect: '/api/loggedIn',
        failureRedirect: '/api/loginFailed',
        failureFlash: true
    }));

module.exports = router;