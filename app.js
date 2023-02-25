const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const app = express();

const { PORT = 3001 } = process.env;
const { ErrorHandler } = require("./utils/errors");

// DB Connection
mongoose.connect("mongodb://localhost:27017/wtwr_db");

// Routes
const routes = require("./routes/index");

app.use(express.json());
app.use(cors());
app.use("/", routes);

app.use((req, res, next) => {
  req.user = {
    _id: "63f37898e4813050d4d5d3a3",
  };
  next();
});

// Error Handling
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.info(`
    🚀  Server is running!
    🔉  Listening on port 3001
    📭  Query at http://localhost:3001
  `);
});
