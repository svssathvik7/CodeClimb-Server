const userModel = require('../models/userModel');
const { easy, hard, medium } = require('../constants/QB');

const getPawnDetails = async (regNo) => {
    try {
        const userDetails = await userModel.findOne({ regNo: regNo });
        return userDetails;
    }
    catch (err) {
        console.log('Error message' + err.message);
        return false;
    }
}
const getUnvisitedQuestion = (child, parent) => {
    var randomNumber = Math.floor(Math.random() * parent.length);
    while (child && child.length !== 0 && child.includes(parent[randomNumber].qId)) {
        randomNumber = Math.floor(Math.random() * parent.length);
    }
    return randomNumber;
}
const getQuestion = async (req, res) => {
    const { regNo, difficulty } = req.body;
    try {
        const user = await userModel.findOne({ regNo: regNo });
        var questions = user.questions;
        var query;
        if (difficulty === 'easy') {
            if (questions.easy.length >= easy.length) {
                questions = await userModel.findOneAndUpdate({ regNo: regNo }, { $set: { "questions.easy": [] } }, { new: true });
            }
            const randomNumber = getUnvisitedQuestion(questions.easy, easy);
            await userModel.updateOne(
                { regNo: regNo },
                { $push: { "questions.easy": easy[randomNumber].qId } }
            );
            query = easy[randomNumber];
        }
        else if (difficulty === 'hard') {
            if (questions.hard.length >= hard.length) {
                questions = await userModel.updateOne({ regNo: regNo }, { $set: { "questions.hard": [] } }, { new: true });
            }
            const randomNumber = getUnvisitedQuestion(questions.hard, hard);
            await userModel.updateOne(
                { regNo: regNo },
                { $push: { "questions.hard": hard[randomNumber].qId } }
            );
            query = hard[randomNumber];
        }
        else {
            if (questions.medium.length >= medium.length) {
                questions = await userModel.findOneAndUpdate({ regNo: regNo }, { $set: { "questions.medium": [] } }, { new: true });
            }
            const randomNumber = getUnvisitedQuestion(questions.medium, medium);
            await userModel.updateOne(
                { regNo: regNo },
                { $push: { "questions.medium": medium[randomNumber].qId } }
            );
            query = medium[randomNumber];
        }
        res.json({ message: "Successfully Fetched Question", status: true, question: query });

    }
    catch (err) {
        console.log('Error message this only' + err.message);
        res.json({ message: "Error Occured", status: false });
    }
}

const getResults = async (req, res) => {
    try {
        const users = await userModel.find({});
        users.sort((a, b) => {
            const scoreComparison = b.score - a.score;
            if (scoreComparison !== 0) {
                return scoreComparison;
            } else {
                return (b.score / b.totalRolls) - (a.score / a.totalRolls);
            }
        });
        res.json({ message: "Successfully fetched Results.", users: users, status: true });

    } catch (error) {
        console.log(error.message);
        res.json({ message: "Error Occured", status: false });
    }
}

const getLeaderBoard = async (req, res) => {
    console.log("requested leaderboard");
    try {
        const users = await userModel.find({}).select("regNo score").sort({ score: -1 });
        res.send({ message: "Success!", status: true, leaderBoard: users });
    } catch (err) {
        console.log('Error message' + err.message);
        res.json({ message: "Error Occured", status: false });
    }
}
module.exports = { getPawnDetails, getQuestion, getLeaderBoard, getResults };