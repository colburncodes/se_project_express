require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

const { PORT = 3001} = process.env;

const { ErrorHandler } = require("./utils/errors");

// DB Connection
mongoose.connect("mongodb://localhost:27017/wtwr_db");

// Routes
const routes = require("./routes/index");

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(requestLogger);
app.use("/", routes);

app.use(errorLogger);
app.use(errors());
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.info(`
    🚀  Server is running!
    🔉  Listening on port 3001
    📭  Query at http://localhost:3001
  `);
});
