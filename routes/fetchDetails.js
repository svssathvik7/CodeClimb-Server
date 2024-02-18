const express = require("express");
const Router = express.Router();
const { getQuestion, getLeaderBoard, getPawnDetails } = require("../controllers/fecthDetailsController");
Router.post('/getPawnDetails', getPawnDetails);
Router.post('/getQuestion', getQuestion);
Router.get("/leader-board", getLeaderBoard);
module.exports = Router;