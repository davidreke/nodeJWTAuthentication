// import user model
const User = require('../models/User');

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
        })
        res.status(201).json(user)
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


