// we use this file to protect routes

const jwt = require('jsonwebtoken');

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

module.exports = {requireAuth}