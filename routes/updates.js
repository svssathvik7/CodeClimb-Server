const express = require('express');
const Router = express.Router();
const { updateScore, updatePosition } = require('../controllers/updatesController.js');


Router.post('/updateScore', updateScore);
Router.post('/updatePosition', updatePosition);

module.exports = Router;