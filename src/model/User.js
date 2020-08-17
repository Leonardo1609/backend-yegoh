const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    names: {
        type: String,
        required: true,
        trim: true
    },
    lastnames: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model( 'Users', UserSchema );
