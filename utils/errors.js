const STATUS_CODES = {
  Ok: 200,
  Created: 201,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  NotAcceptable: 406,
  Conflict: 409,
  ServerError: 500,
  DuplicateError: 11000,
};

const ErrorHandler = (err, req, res, next) => {
  console.info("Middleware Error Handling");
  console.error(err.stack); // log the error stack trace to the console

  // Set a default error status code if none provided
  const statusCode = res.statusCode || 500;

  // Return a JSON response with the error message and status code
  res.status(statusCode).json({
    message: "An error has occured on the server",
  });
};

module.exports = {
  STATUS_CODES,
  ErrorHandler,
};
