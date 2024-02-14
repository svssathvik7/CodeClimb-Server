require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const dp = require('./db/dbConnection.js');
const loginRoute = require('./routes/authentication.js');
const updateScoreRoute = require('./routes/updates.js');
const codeRunnerRoute = require("./routes/codeRunner.js");
const fetchDetails = require("./routes/fetchDetails.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user/', loginRoute);
app.use('/api/user/metrics/', updateScoreRoute);
app.use("/api/codes/", codeRunnerRoute);
app.use('/api/details/', fetchDetails);

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});