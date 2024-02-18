require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const dp = require('./db/dbConnection.js');
const loginRouter = require('./routes/authentication.js');
const updatesRouter = require('./routes/updates.js');
const codeRunnerRouter = require("./routes/codeRunner.js");
const fetchDetailsRouter = require("./routes/fetchDetails.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user/', loginRouter);
app.use('/api/user/metrics/', updatesRouter);
app.use("/api/codes/", codeRunnerRouter);
app.use('/api/details/', fetchDetailsRouter);
app.use('/mediumQB', express.static(path.join(__dirname, 'mediumQB')));

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});