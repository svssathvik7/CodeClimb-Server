const express = require("express");
const Router = express.Router();
const { getPosition } = require("../controllers/fecthDetailsController");
Router.post('/getPosition', getPosition);

module.exports = Router;