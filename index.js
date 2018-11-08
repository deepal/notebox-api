require('dotenv').config();
const express = require('express');
const session = require('express-session');
const http = require('http');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const apiRoutes = require('./api');
const authRoutes = require('./routes/auth');

const app = express();

app.use(session({
    name: 'NBOX_SESSION',
    secret: process.env.SERVER_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/redirect"
  }, (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    //    User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //      return done(err, user);
    //    });
  }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, {id});
});

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000);