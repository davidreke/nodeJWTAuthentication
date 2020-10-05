// import user model
const User = require('../models/User');
// import jwon webtoken
const jwt = require('jsonwebtoken')

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    // the unique feature will have an err.code in the future
    let errors = {email: '', password:''};

    // duplicate error code
    if (err.code === 11000){
        errors.email = "that email is already registred";
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            // console.log(properties)
            errors[properties.path]= properties.message
        })
    }

    return errors
}

// sets max age of login
const maxAge = 3*24*60*60

// create and send token
const createToken = (id) =>{
    return jwt.sign({id}, 'net ninja secret',{
        expiresIn: maxAge
    })
    // the secret should be long and not in a public repository IRL.
}

module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = async (req, res) => {
    // destructure to just get the email and password from the body
    const { email, password } = req.body;
    // console.log(email, password)

    // add a try catch block

    try{
        const user = await User.create({
            email, 
            password
        });
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000})
        // (max age is in seconds and this take milliseconds)
        res.status(201).json({user: user._id})
    }
    catch (err){
        const errors = handleErrors(err);
        // console.log(err);
        res.status(400).json({errors});
    }
    
    // res.send('new signup')
}

module.exports.login_post = async (req, res) => {
    // shows us the data that was sent.
    // console.log(req.body)
    // destructure to just get the email and password from the body
    const {email, password} = req.body;

    

    console.log(email, password)
    res.send('user login')
}


