const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./api_keys");
const User = require("../models/db_model");


passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    //add user to session(user is attached to 'req' obj)
    done(null,user);
  })
})


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
        - a profile response can be referred in ./profile_res
        - profile is an object;
        - check if the googleid is already present in our db and ifnot add it.
        */        
      //check if this user already exists
      User.findOne({ googleID: profile.id }).then(matchedUser => {
        if (matchedUser) {
          console.log("Existing User ", matchedUser);
          done(null,matchedUser);
        } else {
          //create and save the record
          new User({
            googleID: profile.id,
            displayName: profile.displayName,
            thumbnail:profile._json.image.url,
          }).save()
            .then(savedRecord => {
              // console.log("successfully saved ", savedRecord);
              //send the newly saved user obj to serialize user
            done(null,savedRecord);
            }).catch((err)=>{
              console.log(err)
            });
            
        }
      }).catch((findErr)=>{console.log(findErr)}); //findone.then

     
    }
  )
);
