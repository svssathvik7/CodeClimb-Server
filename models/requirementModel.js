const mongoose = require("mongoose");

const reqSchema = new mongoose.Schema({
    id: {
        type: String,
        default: "requirements",
        unique: true // Ensure uniqueness of the id field
    },
    startTime: {
        type: Date,
        default: Date.now
    }
});

const reqModel = mongoose.model("reqs", reqSchema);
module.exports = reqModel;