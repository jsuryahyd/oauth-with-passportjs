const passport  = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./api_keys');
passport.use(
    new GoogleStrategy({
        //options
        clientID :keys.google.clientID,
        clientSecret :keys.google.clientSecret,
        callbackURL : '/auth/google/redirect',
    },()=>{
        //passport callback function

    })
);