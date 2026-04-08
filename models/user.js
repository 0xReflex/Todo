const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user : {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    }
});

const USER = mongoose.model('users', userSchema);
module.exports = USER;