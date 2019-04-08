const mongoose = require('mongoose');
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 55
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 55,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 55,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = new mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(55).required(),
        email: Joi.string().email().required(),
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).required()
    }

    return Joi.validate(user, schema)
}

module.exports.User = User;
module.exports.validateUser = validateUser;