require('dotenv').config();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");


const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body.formData;
        const regNo = username;
        const checkUser = await userModel.findOne({ regNo: regNo });
        if (!checkUser) {
            password = await bcrypt(password,10);
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
            return res.json({ message: "Successfully registered", status: true });
        }
        else {
            return res.json({ message: "User already registered!", status: false });
        }
    } catch (error) {
        console.log(error.message);
        return res.json({ message: "Error Occured", status: false });
    }
}
const loginUser = async (regNo, password) => {
    try {
        const user = await userModel.findOne({ regNo: regNo });
        if (user === null) {
            return false;
        }
        const match = await bcrypt.compare(password,user.password);
        if (match) {
            const token = jwt.sign({
                id: user._id,
                regNo: user.regNo,
                isAdmin : user.isAdmin
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
    // we expect users object where each user has userID and isAdmin value
    try {
        const { users } = req.body;
        const commonHashPass = bcrypt("codathon",10);
        for (const user of users) {

            await userModel.create({ regNo: user.userID, password: commonHashPass,isAdmin : (user.isAdmin == "true" ? true : false) });
            console.log(`User ${user.userID} created successfully`);
        }
        res.json({ message: 'All users created successfully', status: true })
    } catch (error) {
        console.error('Error creating users:', error);
        res.json({ message: "Error occured while creating accounts", status: false });
    }
};

module.exports = { loginUser, registerUser, createUsers };