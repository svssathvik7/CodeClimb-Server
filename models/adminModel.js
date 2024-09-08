const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    regNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const adminModel = new mongoose.model('admins', adminSchema);

module.exports = adminModel;