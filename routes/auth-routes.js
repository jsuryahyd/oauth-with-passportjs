const router = require("express").Router();
const passport = require('passport');

//auth/login
router.get("/login", (req, res) => {
  //login template for auth/login
  res.render("login");
});

router.get("/logout", (req, res) => {
  //placeholder functionality
  res.send("logging you out");
  //handle with passport
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

// on success google redirects here(we set this in passport-setup and google console )
router.get('/google/redirect',(req,res)=>{
    res.send('You are redirected here by google');
})

// export default router;
module.exports = router;
