const userModel = require('../models/userModel');
const { easy, hard, medium } = require('../constants/QB');

const getPosition = async (req, res) => {
    const { regNo } = req.body;
    try {
        const userDetails = await userModel.findOne({ regNo: regNo });
        res.json({ message: "Successfully Fetched", userDetails: userDetails, status: true })
    }
    catch (err) {
        console.log('Error message' + err.message);
        res.json({ message: "Error Occured", status: false });
    }
}

const getQuestion = async (req, res) => {
    const { regNo, difficulty } = req.body;
    try {
        var query;
        if (difficulty === 'easy') {
            const randomNumber = Math.floor(Math.random() * easy.length);
            query = easy[randomNumber];
        }
        else if (difficulty === 'hard') {
            const randomNumber = Math.floor(Math.random() * hard.length);
            query = hard[randomNumber];
        }
        else {
            query = 'medium';
        }

        res.json({ message: "Successfully Fetched Question", status: true, question: query });

    }
    catch (err) {
        console.log('Error message' + err.message);
        res.json({ message: "Error Occured", status: false });
    }
}

const getLeaderBoard = async(req,res)=>{
    console.log("requested leaderboard");
    try {
        const users = await userModel.find({}).select("regNo score");
        res.send({message:"Success!",status:true,leaderBoard:users});
    } catch (err) {
        console.log('Error message' + err.message);
        res.json({ message: "Error Occured", status: false });
    }
}
module.exports = { getPosition, getQuestion, getLeaderBoard};