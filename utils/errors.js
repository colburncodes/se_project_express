function handle400Errors(req, res, next) {
  const error = new Error("Bad Request");
  error.status = 400;
  next(error);
}

function handle404Errors(req, res, next) {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
}

function handle500Errors(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
}

module.exports = {
  handle400Errors,
  handle404Errors,
  handle500Errors,
};
