const userModel = require('../models/userModel');
const reqModel = require("../models/requirementModel");

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
const updateContestTimer = async(req,res)=>{
    const {regNo,startTime} = req.body;
    const acl = ["21331A05G3","21331A05F9","21331A05G5"];
    console.log(regNo);
    if(acl.includes(regNo))
    {
        try {
            const reqDoc = await reqModel.findOne({id:"requirements"});
            if(reqDoc){
                res.json({message:"Success!",status:true,startTime:reqDoc.startTime});
            }
            else{
                const reqDoc = await new reqModel({
                    id : "requirement",
                    startTime : new Date()
                });
                await reqDoc.save();
                res.json({ message: "No doc found", status: true,startTime:reqDoc.startTime });
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
    try {
        const result = await reqModel.findOne({id:"requirement"});
        res.json({message:"Success!",status:true,startTime: result.startTime});
    } catch (error) {
        console.log(error.message);
        res.json({ message: "Error getting Contest Time", status: false });
    }
}
module.exports = { updatePosition,updateContestTimer,getContestTime };