const express = require('express');
const { passport } = require('../../modules/auth/oauth');

const router = express.Router();

router.get('/login/google', (req, res) => {
    if (req.user) {
        res.redirect('/');
    } else {
        passport.authenticate('google', {
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        })(req, res);
    }
});

router.get('/google/redirect',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/loginFailed',
        failureFlash: true
    }));

module.exports = router;
