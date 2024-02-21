require('dotenv').config();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {
        const { regNo, password } = req.body;
        const checkUser = await userModel.findOne({ regNo: regNo });
        if (!checkUser) {
            const newUser = new userModel({
                regNo: regNo,
                password: password,
                score: 0,
                totalRolls: 0,
                currPosition: 1,
                bonus: 0,
                questions: {
                    easy: [],
                    medium: [],
                    hard: []
                },
            });
            await newUser.save();
            res.json({ message: "Successfully registered", status: true });
        }
        else {
            res.json({ message: "User already registered!", status: false });
        }
    } catch (error) {
        console.log(error.message);
        res.json({ message: "Error Occured", status: false });
    }
}
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

module.exports = { loginUser, registerUser };