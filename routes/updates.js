const express = require('express');
const Router = express.Router();
const { updateScore, updatePosition,updateContestTimer,getContestTime } = require('../controllers/updatesController.js');


Router.post('/updatePosition', updatePosition);
Router.post("/set-contest-time",updateContestTimer);
Router.get("/get-contest-time",getContestTime);
module.exports = Router;