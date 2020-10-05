const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        // by making the value an array we can make the second value the error message that is served when there is an error
        required: [true,'Please Enter an e-mail'],
        unique: true,
        lowercase: true,
        // first value is a function that returns true or false, the second value is the error message returned if it is false
        // npm install validator
        validate:[isEmail,'please enter a valid e-mail']
    },
    password: {
        type: String,
        required: [true, 'Please Enter an e-mail'],
        minlength: [6, "Minminum password length is 6 characters"]
    },

});
// mongoose,model takes two arguments
// 1) A string that is the singular of the mongoDB collection that the model is used in
// 2) The schema that is used for the model

// fire a function after doc saved to db
// post does not mean a post request, but after
// takes several arguments
// 1.what event  causes it to fire
// 2. callback function that will fire after the even
userSchema.post('save', function(doc, next) {
    // doc is the document that was saved, and the next method allows us to move on after we run the function
    console.log('new user was created', doc);
    // the next method is used after every mongoose middleware
    next();
})

// fire function before doc is saved to db
userSchema.pre('save', function (next){
    // the pre hook is where we hash teh password
    // console.log('user about to be created and saved', this)
    // npm install bcrypt

    next()
})


const User = mongoose.model('user', userSchema)

module.exports = User;