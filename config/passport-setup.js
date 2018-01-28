const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./api_keys");
const User = require("../models/db_model");

passport.use(
  new GoogleStrategy(
    {
      //options
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      /* 
        - passport callback function
        - console.log('authentication started');
        - console.log(profile);
        - profile is an object;
        - check if the googleid is already present in our db and ifnot add it.
        */
      //check if this user already exists
      User.findOne({ googleID: profile.id }).then(matchedUser => {
        if (matchedUser) {
          console.log("Existing User ", matchedUser);
        } else {
          //create and save the record
          new User({
            googleID: profile.id,
            displayName: profile.displayName
          })
            .save()
            .then(savedRecord => {
              console.log("successfully saved ", savedRecord);
            });
        }
      }); //findone.then

      done();
    }
  )
);
