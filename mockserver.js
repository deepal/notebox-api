const express = require('express');
const http = require('http');
const appRootPath = require('app-root-path');
const app = express();

app.use(express.static(appRootPath.resolve('./dist')));

app.get('/note', (req, res) => res.status(200).send(require('./mock-data/get-notes.json')));
app.post('/note', (req, res) => res.status(201).send(require('./mock-data/create-note.json')));
app.get('/note/:id', (req, res) => res.status(200).send(require('./mock-data/get-note.json')));
app.put('/note/:id', (req, res) => res.status(200).send(require('./mock-data/update-note.json')));
app.delete('/note/:id', (req, res) => res.status(200).send(require('./mock-data/delete-note.json')));

app.get('/notebox', (req, res) => res.status(200).send(require('./mock-data/get-noteboxes.json')));
app.post('/notebox', (req, res) => res.status(201).send(require('./mock-data/create-notebox.json')));
app.get('/notebox/:id', (req, res) => res.status(200).send(require('./mock-data/get-notebox.json')));
app.get('/notebox/:id/note', (req, res) => res.status(200).send(require('./mock-data/get-notebox-notes.json')));
app.put('/notebox/:id', (req, res) => res.status(200).send(require('./mock-data/update-notebox.json')));
app.delete('/notebox/:id', (req, res) => res.status(200).send(require('./mock-data/delete-notebox.json')));

app.get('/tag', (req, res) => res.status(200).send(require('./mock-data/get-tags.json')));

app.get('*', (req, res) => {
    res.sendFile(appRootPath.resolve('dist/index.html'));
});

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
    console.log('server is listening');
});