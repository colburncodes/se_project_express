require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const { errors } = require("celebrate");
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

// Routes
const routes = require("./routes/index");

app.use(helmet());
app.use(express.json());
app.use(cors());
app.options("*", cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

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
  customConsoleLog(
    `
  🚀  Server is running!
  🔉  Listening on port 3001
  📭  Query at http://localhost:3001
  `,
    "info"
  );
});
