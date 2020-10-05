// import user model
const User = require('../models/User');

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
        console.log(err);
        res.status(400).send('error, user not created');
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


