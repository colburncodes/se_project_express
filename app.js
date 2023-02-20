const express = require("express");
const mongoose = require("mongoose");
const app = express();

const { PORT = 3001 } = process.env;

// DB Connection
mongoose.connect("mongodb://localhost:27017/wtwr_db");

// Routes
const routes = require("./routes/index");

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 3001
    📭  Query at http://localhost:3001
  `);
});
