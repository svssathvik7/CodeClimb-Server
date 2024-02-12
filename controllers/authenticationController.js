require('dotenv').config();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    const { regNo, password } = req.body;
    try {
        const user = await userModel.findOne({ regNo: regNo });
        if (user === null) {
            res.json({ message: "There is no such user registered", status: false });
        }
        else if (user.password === password) {
            const token = jwt.sign({
                id: user._id,
                regNo: user.regNo
            }, process.env.SECRET, { expiresIn: '90m' });
            res.json({ message: "User successfully logged in", status: true, token: token });
        }
        else {
            res.json({ message: "Incorrect Password", status: false });
        }
    }
    catch (err) {
        console.log('Error', err.message);
    }
}

module.exports = { loginUser };