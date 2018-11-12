const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.user);
    res.status(200).send('note');
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
