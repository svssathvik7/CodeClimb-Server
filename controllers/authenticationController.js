require('dotenv').config();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const loginUser = async (regNo, password) => {
    try {
        const user = await userModel.findOne({ regNo: regNo });
        if (user === null) {
            return false;
        }
        else if (user.password === password) {
            const token = jwt.sign({
                id: user._id,
                regNo: user.regNo
            }, process.env.SECRET, { expiresIn: '60m' });
            return [true, token];
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.log('Error', err.message);
        return false;
    }
}

module.exports = { loginUser };