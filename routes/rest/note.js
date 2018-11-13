const express = require('express');
const message = require('tiny-message');
const {isNone, isEmptyArray} = require('../../modules/util/validation');
const code = require('../../modules/util/httpStatus');
const note = require('../../modules/database/helpers/note');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const notes = await note.listNotes();
        res.status(code.OK).json(message.success({ data: notes }));
    } catch (err) {
        next(err);
    }
});

router.post('/', (req, res) => {

});

router.get('/:noteId', (req, res) => {

});

router.put('/:noteId', (req, res) => {

});

router.delete('/:noteId', (req, res) => {

});

module.exports = router;
