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
const User = mongoose.model('user', userSchema)

module.exports = User;