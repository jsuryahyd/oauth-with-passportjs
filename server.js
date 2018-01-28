const express = require('express');
const path  = require('path');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/api_keys');



/* Actual implementation */
const server = express();
//connect to db
mongoose.connect(keys.mongodb.dbURI,()=>{
    console.log('connected to mongodb');
})

//config
server.set('view engine','ejs');
server.use('/static',express.static(path.join(__dirname,'public')));
//routes
server.use('/auth',authRoutes);
server.get('/',(req,res)=>{
    // res.send('Namastey World');
    res.render('home');
});

//listen
const port = 3000
server.listen(port,()=>{
    console.log(`base url :- localhost:${port}/`);
})