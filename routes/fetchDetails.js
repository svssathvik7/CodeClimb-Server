const express = require("express");
const Router = express.Router();
const { getPosition, getQuestion } = require("../controllers/fecthDetailsController");
Router.post('/getPosition', getPosition);
Router.post('/getQuestion', getQuestion);

module.exports = Router;