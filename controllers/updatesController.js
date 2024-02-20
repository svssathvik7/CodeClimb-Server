const userModel = require('../models/userModel');
const reqModel = require("../models/requirementModel");

const updatePosition = async (diceRoll, regNo, from) => {
    try {
        var newPosition, score;
        if (diceRoll !== 0) {
            const query = (from === 'dice-roll') ? { $inc: { currPosition: diceRoll, totalRolls: 1 } } : { $set: { currPosition: diceRoll }, $inc: { totalRolls: 1 } };
            const user = await userModel.findOneAndUpdate({ regNo: regNo }, query, { new: true });
            score = user.currPosition * 100;
            await userModel.updateOne({ regNo: regNo }, { $set: { score: score } });
            newPosition = user.currPosition;
        }
        else {
            const user = await userModel.findOne({ regNo: regNo });
            score = user.score;
            newPosition = user.currPosition;
        }
        const newPositionObject = {
            newPosition: newPosition,
            score: score
        }
        return newPositionObject;

    }
    catch (err) {
        console.log(err.message);
        return false;
    }
}

const updateBonus = async (regNo, bonus) => {
    try {
        await userModel.updateOne({ regNo: regNo }, { $inc: { bonus: bonus } });
        return true;
    }
    catch (err) {
        console.log(err.message);
        return false;
    }
}
const updateUserRollValue = async (req, res) => {
    const { regNo, diceRoll } = req.body;
    const uniqueRegNo = regNo.toLowerCase();
    try {
        const user = await userModel.findOneAndUpdate({ regNo: uniqueRegNo },
            { $push: { rollValues: diceRoll } },
            { new: true }
        );

        res.json({
            message: 'Successfully updated dice roll value',
            status: true,
            rollValues: user.rollValues,
        });
    } catch (err) {
        console.error('Error updating dice roll value:', err.message);
        res.json({ message: 'Error while updating dice roll value', status: false });
    }
}

const updateContestTimer = async (req, res) => {
    const { regNo, startTime } = req.body;
    const uniqueRegNo = regNo.toLowerCase();
    const acl = ["21331a05g3", "21331a05f9", "21331a05g5"];
    if (acl.includes(uniqueRegNo)) {
        var defaultStartTime = Date.now();
        defaultStartTime += 60 * 60 * 1000;
        try {
            var reqDoc = await reqModel.findOne({ id: "requirements" });
            if (reqDoc) {
                reqDoc = await reqModel.findOneAndUpdate({ id: "requirements" }, { startTime: defaultStartTime });
                await reqDoc.save();
                res.json({ message: "Success!", status: true, startTime: reqDoc.startTime });
            }
            else {
                const reqDoc = await new reqModel({
                    startTime: defaultStartTime
                });
                await reqDoc.save();
                res.json({ message: "No doc found", status: true, startTime: startTime ? startTime : defaultStartTime });
            }
        } catch (error) {
            console.log(error);
            res.json({ message: "Internal error", status: false });
        }
    }
    else {
        res.json({ message: "No access", status: false });
    }
}
const getContestTime = async (req, res) => {
    console.log("get time");
    try {
        const result = await reqModel.findOne({ id: "requirements" });
        res.json({ message: "Success!", status: true, startTime: result.startTime });
    } catch (error) {
        console.log(error.message);
        res.json({ message: "Error getting Contest Time", status: false });
    }
}
const setScoreZero = async (regNo) => {
    try {
        await userModel.findOneAndUpdate({ regNo: regNo }, { $set: { score: 0, currPosition: 1, totalRolls: 0, rollValues: [] } });
        return true;
    }
    catch (error) {
        console.log(error.message);
        return false;
    }
}
module.exports = { updatePosition, updateContestTimer, getContestTime, setScoreZero, updateUserRollValue };
