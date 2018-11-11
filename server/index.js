require('dotenv').config();
const express = require('express');
const session = require('express-session');
const http = require('http');
const { passport } = require('../modules/auth/oauth');
const routes = require('../routes');

const app = express();

app.use(session({
    name: 'NBOX_SESSION',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
