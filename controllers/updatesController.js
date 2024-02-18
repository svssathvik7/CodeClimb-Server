const userModel = require('../models/userModel');
const reqModel = require("../models/requirementModel");

const updatePosition = async (req, res) => {
    const { diceRoll, regNo, from } = req.body;
    try {
        if (diceRoll !== 0) {
            const query = (from === 'dice-roll') ? { $inc: { currPosition: diceRoll, totalRolls: 1 } } : { $set: { currPosition: diceRoll }, $inc: { totalRolls: 1 } };
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
const updateContestTimer = async(req,res)=>{
    const {regNo,startTime} = req.body;
    const acl = ["21331A05G3","21331A05F9","21331A05G5"];
    if(acl.includes(regNo))
    {
        var defaultStartTime = Date.now();
        defaultStartTime += 60*60*1000;
        try {
            var reqDoc = await reqModel.findOne({id:"requirements"});
            if(reqDoc){
                reqDoc = await reqModel.findOneAndUpdate({id:"requirements"},{startTime:defaultStartTime});
                await reqDoc.save();
                res.json({message:"Success!",status:true,startTime:reqDoc.startTime});
            }
            else{
                const reqDoc = await new reqModel({
                    startTime : defaultStartTime
                });
                await reqDoc.save();
                res.json({ message: "No doc found", status: true,startTime:startTime ? startTime : defaultStartTime});
            }
        } catch (error) {
            console.log(error);
            res.json({ message: "Internal error", status: false });
        }
    }
    else{
        res.json({ message: "No access", status: false });
    }
}
const getContestTime = async(req,res)=>{
    console.log("get time");
    try {
        const result = await reqModel.findOne({id:"requirements"});
        res.json({message:"Success!",status:true,startTime: result.startTime});
    } catch (error) {
        console.log(error.message);
        res.json({ message: "Error getting Contest Time", status: false });
    }
}
module.exports = { updatePosition,updateContestTimer,getContestTime };