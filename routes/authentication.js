const express = require('express');
const Router = express.Router();
const { loginUser, registerUser, createUsers } = require('../controllers/authenticationController.js');


Router.post('/login', loginUser);
Router.post('/register', registerUser);
Router.post('/createUsers', createUsers);

module.exports = Router;