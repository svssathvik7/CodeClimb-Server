const express = require('express');
const Router = express.Router();
const { loginUser, registerUser } = require('../controllers/authenticationController.js');


Router.post('/login', loginUser);
Router.post('/register', registerUser);

module.exports = Router;