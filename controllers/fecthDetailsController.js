const userModel = require('../models/userModel');


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

module.exports = { getPosition };