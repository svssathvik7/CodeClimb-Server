const userModel = require('../models/userModel');

const updateScore = async (req, res) => {
    const { regNo, endPosition, totalRolls } = req.body;
    try {
        const score = endPosition / totalRolls;
        await userModel.findOneAndUpdate({ regNo: regNo }, { $set: { score: score, endPosition: endPosition }, $inc: { totalRolls: 1 } });
        res.json({ message: "Successfully updated users score", status: true });
    }
    catch (err) {
        console.log('Error', err.message);
        res.json({ message: "Error while updated score of the user", status: false });
    }
}

module.exports = { updateScore };