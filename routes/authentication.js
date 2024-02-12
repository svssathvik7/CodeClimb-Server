const express = require('express');
const Router = express.Router();
const { loginUser } = require('../controllers/authenticationController.js');


Router.post('/login', loginUser);

module.exports = Router;