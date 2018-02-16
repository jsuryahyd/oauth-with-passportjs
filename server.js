const express = require('express');
const path  = require('path');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/api_keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

/* Actual implementation */
const server = express();
//connect to db
mongoose.connect(keys.mongodb.dbURI,()=>{
    console.log('connected to mongodb');
})

//config
server.set('view engine','ejs');
server.use('/static',express.static(path.join(__dirname,'public')));

//start session with passport
server.use(cookieSession({
    maxAge : 24*60*60*1000 ,
    keys :[keys.session.cookieKey]
}));
server.use(passport.initialize());
server.use(passport.session());
// console.log(passport.session.toString())
//routes
server.use('/auth',authRoutes);
server.use('/profile',profileRoutes);
server.get('/',(req,res)=>{
    // for showing login/logout buttons, send userprofile
    res.render('home',{userProfile:req.user});
});

//listen
const port = 3000
server.listen(port,()=>{
    console.log(`base url :- localhost:${port}/`);
})
