const ErrorHandler = (err, req, res, next) => {
  console.info("Middleware Error Handling");
  console.error(err.stack); // log the error stack trace to the console

  // Set a default error status code if none provided
  const statusCode = res.statusCode || 500;

  // Return a JSON response with the error message and status code
  res.status(statusCode).json({
    message: err.message,
    status: statusCode,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

module.exports = {
  ErrorHandler,
};
