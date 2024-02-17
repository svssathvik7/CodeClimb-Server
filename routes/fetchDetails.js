const express = require("express");
const Router = express.Router();
const { getPosition, getQuestion,getLeaderBoard } = require("../controllers/fecthDetailsController");
Router.post('/getPosition', getPosition);
Router.post('/getQuestion', getQuestion);
Router.get("/leader-board",getLeaderBoard);
module.exports = Router;