// we use this file to protect routes

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) =>{

    // grab jwt token
    const token = req.cookies.jwt

    // check for jwt token
    if(token){
        // we get secret from jwt.sign method
        jwt.verify(token, "net ninja secret", (err, decodedToken) =>{
            if (err){
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken)
                next()
            }
        });
    }  else {
        res.redirect('/login')
    }
}

// check current user

const checkUser = (req, res, next) =>{
    // get token
    const token = req.cookies.jwt

    if (token){
                jwt.verify(token, "net ninja secret", async (err, decodedToken) =>{
            if (err){
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id);

                // gives us a user to show in the views
                res.locals.user = user
                next()
            }
        });
    } else {
        res.locals.user = null;
        next()
    }
}

module.exports = {requireAuth, checkUser}