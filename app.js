require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const { limiter } = require("./middlewares/limiter");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { customConsoleLog } = require("./utils/customConsoleLog");

const app = express();

const { PORT = 3001 } = process.env;

const { ErrorHandler } = require("./utils/errors");

// DB Connection
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => {
    customConsoleLog("WTWR Database Successfully Connected", "info");
  })
  .catch(() => {
    customConsoleLog("Error Connecting to Database", "error");
  });

// log request to request.log
app.use(requestLogger);

// Routes
const routes = require("./routes/index");

app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(cors());
app.options("*", cors());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});


app.use("/", routes);

app.use(errorLogger);
app.use(errors());
app.use(ErrorHandler);

app.listen(PORT, () => {
  customConsoleLog(
    `
  🚀  Server is running!
  🔉  Listening on port 3001
  📭  Query at http://localhost:3001
  `,
    "info"
  );
});
