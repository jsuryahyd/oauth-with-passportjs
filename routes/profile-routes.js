const router = require('express').Router();


/*
- if users try to login by typing url
- a middleware that runs before req-handler for base route
*/
const loggedInCheck = (req,res,next)=>{
    if(!req.user){
        res.redirect('/auth/login');
    }else{
        //logged in i.e a cookie was found by passport
        next();
    }
}

//base_url/profile/
router.get('/',loggedInCheck,(req,res)=>{
    // res.send('You are logged In, Your profile is '+req.user.displayName);
    res.render('profile',{userProfile:req.user});
})

module.exports = router;