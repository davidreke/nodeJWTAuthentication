const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },

});
// mongoose,model takes two arguments
// 1) A string that is the singular of the mongoDB collection that the model is used in
// 2) The schema that is used for the model
const User = mongoose.model('user', userSchema)

module.exports = User;