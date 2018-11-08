const express = require('express');
const router = express.Router();
const noteRoutes = require('./routes/note');
const noteBoxRoutes = require('./routes/notebox');

router.get('/loggedIn', (req, res) => {
    res.status(200).send(`successfully logged in via google: ${req.user.id}`);
});

router.get('/loginFailed', (req, res) => {
    res.status(401).send('google login failed');
});

router.use('/note', noteRoutes);
router.use('/noteBox', noteBoxRoutes);

module.exports = router;