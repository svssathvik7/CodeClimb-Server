const express = require("express");
const Router = express.Router();
const {codeTestController} = require("../controllers/codeTestController.js");

Router.post("/run-code",codeTestController);

module.exports = Router;