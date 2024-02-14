const express = require("express");
const Router = express.Router();
const {codeTestPipeline} = require("../controllers/codeTestController.js");

Router.post("/run-code",codeTestPipeline);

module.exports = Router;