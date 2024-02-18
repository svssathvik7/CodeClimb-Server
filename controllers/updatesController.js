const userModel = require('../models/userModel');


const updatePosition = async (req, res) => {
    const { diceRoll, regNo, from } = req.body;
    console.log(diceRoll, regNo, from);
    try {
        if (diceRoll !== 0) {
            const query = (from === 'dice-roll') ? { $inc: { currPosition: diceRoll, totalRolls: 1 } } : { $set: { currPosition: diceRoll }, $inc: { totalRolls: 1 } };
            console.log(query);
            const user = await userModel.findOneAndUpdate({ regNo: regNo }, query, { new: true });
            const score = user.currPosition*100;
            await userModel.updateOne({ regNo: regNo }, { $set: { score: score } });
            res.json({ message: "Successfully Updated", status: true, newPosition: user.currPosition, score: score });
        }
        else {
            const user = await userModel.findOne({ regNo: regNo });
            res.json({ message: "Succssfully updated", status: true, newPosition: user.currPosition, score: user.score });
        }

    }
    catch (err) {
        console.log(err.message);
        res.json({ message: "Error while updated position of the user", status: false });

    }
}

module.exports = { updatePosition };