const express = require('express');
const path  = require('path');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');

const server = express();
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