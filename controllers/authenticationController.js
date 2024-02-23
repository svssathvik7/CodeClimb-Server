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

const createUsers = async (req, res) => {
    try {
        const { userIDs } = req.body;
        for (const userID of userIDs) {

            await userModel.create({ regNo: userID, password: 'codathon' });
            console.log(`User ${userID} created successfully`);
        }
        res.json({ message: 'All users created successfully', status: true })
    } catch (error) {
        console.error('Error creating users:', error);
        res.json({ message: "Error occured while creating accounts", status: false });
    }
};

module.exports = { loginUser, registerUser, createUsers };