const express = require('express');
const auth = require('./rest/auth');
const note = require('./rest/note');
const notebox = require('./rest/notebox');
const tag = require('./rest/tag');
const user = require('./rest/user');

const router = express.Router();

router.use('/auth', auth);
router.use('/note', note);
router.use('/notebox', notebox);
router.use('/tag', tag);
router.use('/user', user);

module.exports = router;
