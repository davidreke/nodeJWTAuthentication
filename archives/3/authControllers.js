module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = (req, res) => {
    // destructure to just get the email and password from the body
    const { email, password } = req.body;
    console.log(email, password)
    
    res.send('new signup')
}

module.exports.login_post = (req, res) => {
    // shows us the data that was sent.
    // console.log(req.body)
    // destructure to just get the email and password from the body
    const {email, password} = req.body;

    console.log(email, password)
    res.send('user login')
}


