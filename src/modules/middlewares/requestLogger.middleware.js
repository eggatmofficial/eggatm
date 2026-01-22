const logger = require("../../config/logger");

const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log response when finished
  res.on('finish', () => {
    const responseTime = Date.now() - start;
    logger.logRequest(req, res, responseTime);
  });
  
  next();
};

module.exports = requestLogger;