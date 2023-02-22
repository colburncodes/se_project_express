const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_UNAUTHORIZED = 401;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_INTERNAL_SERVER_ERROR = 500;

function handle400Errors(req, res, next) {
  const error = new Error("Bad Request");
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(ERROR_CODE_BAD_REQUEST).send({ message: error.message });
  }
  return next(error);
}

function handle401Errors(req, res, next) {
  const error = new Error("Unauthorized");
  if (error.name === "Unauthorized") {
    return res.status(ERROR_CODE_UNAUTHORIZED).send({ message: error.message });
  }
  return next(error);
}

function handle404Errors(req, res, next) {
  const error = new Error("Not Found");
  if (error.name === "Not Found") {
    return res.status(ERROR_CODE_NOT_FOUND).send({ message: error.message });
  }
  return next(error);
}

function handle500Errors(err, req, res, next) {
  res.status(err.status || ERROR_CODE_INTERNAL_SERVER_ERROR);
  res.json({
    error: {
      message: err.message,
    },
  });
}

module.exports = {
  handle400Errors,
  handle401Errors,
  handle404Errors,
  handle500Errors,
};
