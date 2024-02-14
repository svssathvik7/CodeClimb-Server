const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    regNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    currPosition: {
        type: Number,
        default: 1
    },
    endPosition: {
        type: Number
    },
    totalRolls: {
        type: Number,
        default: 0
    },
    score: {
        type: Number
    },
    questions: [
        {
            type: String
        }
    ]
});

const userModel = new mongoose.model('users', userSchema);

module.exports = userModel;