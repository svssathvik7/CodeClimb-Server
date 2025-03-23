const mongoose = require("mongoose");
// process.env will be used once we move to production
mongoose.connect(process.env.DB);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error connection to db");
});
db.once("open", () => {
  console.log("Successfully connected to database");
});

module.exports = db;
