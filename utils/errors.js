const ERROR_CODES = {
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  ServerError: 500,
};

const ErrorHandler = (err, req, res, next) => {
  console.info("Middleware Error Handling");
  console.error(err.message);

  const errStatus = err.statusCode || ERROR_CODES.ServerError;
  const errMsg = err.message || "Something went wrong";

  const status = res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.error : {},
  });

  return status;
};

module.exports = {
  ErrorHandler,
};
