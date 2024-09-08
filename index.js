require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const dp = require('./db/dbConnection.js');
const loginRouter = require('./routes/authentication.js');
const updatesRouter = require('./routes/updates.js');
const socketIo = require('socket.io');
const { Server } = require("socket.io");
const codeRunnerRouter = require("./routes/codeRunner.js");
const fetchDetailsRouter = require("./routes/fetchDetails.js");
const { getPawnDetails, getQuestion, getLeaderBoard } = require('./controllers/fecthDetailsController.js');
const { updatePosition, setScoreZero, updateBonus } = require('./controllers/updatesController.js');
const { codeTestPipeline } = require('./controllers/codeTestController.js');
const { loginUser } = require('./controllers/authenticationController.js');
const userModel = require('./models/userModel.js');


const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user/', loginRouter);
app.use('/api/user/metrics/', updatesRouter);
app.use("/api/codes/", codeRunnerRouter);
app.use('/api/details/', fetchDetailsRouter);
app.use('/mediumQB', express.static(path.join(__dirname, 'mediumQB')));

const expressServer = app.listen(PORT, async () => {
    console.log(`Listening at port ${PORT}`);
});


const io = new Server(expressServer, {
    cors: process.env.FRONT_END_URL,
    methods: ["Get", "Post", "Delete", "Patch"]
});


io.on('connection', (socket) => {
    socket.on('getPawnDetails', async (data) => {
        const regNo = data;
        const result = await getPawnDetails(regNo);
        socket.emit('pawnDetails', result);
    });

    socket.on('updatePawnPosition', async (data) => {
        const { diceRoll, regNo, from } = data;
        const pawnObject = await updatePosition(diceRoll, regNo, from);
        socket.emit('updatedPawnDetails', pawnObject);
    });


    socket.on('login', async (data) => {
        const { regNo, password } = data;
        const result = await loginUser(regNo, password);
        socket.emit('login-result', result);
    });

    socket.on('set-score-zero', async (data) => {
        const { regNo } = data;
        const result = await setScoreZero(regNo);
        socket.emit('on-set-score-zero', result);
    });

    socket.on('get-leader-board', async (data) => {
        const result = await getLeaderBoard();
        socket.emit('on-leader-board', result);
    })
});