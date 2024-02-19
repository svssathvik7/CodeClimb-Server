const express = require('express');
const Router = express.Router();
const { updateScore, updatePosition, updateContestTimer, getContestTime, setScoreZero } = require('../controllers/updatesController.js');


Router.post('/updatePosition', updatePosition);
Router.post("/set-contest-time", updateContestTimer);
Router.get("/get-contest-time", getContestTime);
Router.post('/set-score-zero', setScoreZero);
module.exports = Router;