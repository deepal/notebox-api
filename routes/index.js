const express = require('express');
const auth = require('./auth');
const note = require('./note');
const notebox = require('./notebox');
const tag = require('./tag');
const user = require('./user');

const router = express.Router();

router.use('/auth', auth);
router.use('/note', note);
router.use('/notebox', notebox);
router.use('/tag', tag);
router.use('/user', user);

module.exports = router;
