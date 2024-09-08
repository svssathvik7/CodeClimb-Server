const express = require('express');
const Router = express.Router();
const { updateScore, updatePosition, updateContestTimer, getContestTime, setScoreZero, updateUserRollValue } = require('../controllers/updatesController.js');


Router.post('/updatePosition', updatePosition);
Router.post("/set-contest-time", updateContestTimer);
Router.get("/get-contest-time", getContestTime);
Router.post("/set-score-zero", setScoreZero);
Router.post('/update-roll-value',updateUserRollValue);
module.exports = Router;