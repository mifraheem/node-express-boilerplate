// Error Handling Middleware as a separate module
const errorHandler = (err, req, res, next) => {
  // Log the error internally
  console.error(err.stack);

  // Set the status code
  const statusCode = err.statusCode || 500;

  // Respond to the client
  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode,
    message: err.message || "Internal Server Error"
  });
};

module.exports = errorHandler;