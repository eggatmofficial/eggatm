const logger = require("../../config/logger");
const ApiError = require("../utils/ApiError");

const errorMiddleware = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    error = new ApiError(
      error.message || "Internal Server Error",
      500 // 👈 FORCE DEFAULT
    );
  }

  const statusCode = error.statusCode || 500; // 👈 SAFETY

  logger.error({
    message: error.message,
    statusCode,
    path: req.originalUrl,
    method: req.method,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorMiddleware;
