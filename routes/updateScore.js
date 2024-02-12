const express = require('express');
const Router = express.Router();
const { updateScore } = require('../controllers/updateScoreController.js');


Router.post('/updateScore', updateScore);

module.exports = Router;