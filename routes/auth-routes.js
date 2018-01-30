const router = require("express").Router();
const passport = require('passport');

//auth/login
router.get("/login", (req, res) => {
  //login template for auth/login
  res.render("login",{userProfile:req.user});
});

router.get("/logout", (req, res) => {
  //placeholder functionality
  // res.send("logging you out");
  //handle with passport
  //there is a user attached with req object
  req.logout();//destroys the session
  res.redirect('/');
});

// router.get('/google',(req,res)=>{
//     //placeholder functionality
//     res.send('sending request to google...');
//     //handle with passport
// })
//implement the above route with passport
router.get("/google", passport.authenticate("google", {
    //our required information about user - just profile info
    scope:['profile']
}));

// // on success google redirects here(we set this in passport-setup and google console )
// router.get('/google/redirect',(req,res)=>{
//     res.send('You are redirected here by google');
// })
/*
- extend the above as follows
- the above redirect url is appended with a token(code=094usidufe4w9u...);
- the passport middleware can exchange the token with profile info.
- it is here, the passport callback function runs.
*/
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
  //passport attached user to req obj by now(as 'user'),
  // res.write('your redirected page')
  // res.send(req.user);
res.redirect('/profile/');
})

// export default router;
module.exports = router;
