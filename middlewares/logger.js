// middlewares/logger.js

const winston = require("winston");
const expressWinston = require("express-winston");

// request logger
const requestLogger = expressWinston.logger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.File({ filename: "request.log" })],
});

// error logger
const errorLogger = expressWinston.errorLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.File({ filename: "error.log" })],
});

module.exports = { requestLogger, errorLogger };
