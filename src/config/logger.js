// const winston = require("winston");
// const path = require("path");

// const logDir = path.join(__dirname, "../logs");

// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.errors({ stack: true }),
//     winston.format.json()
//   ),
//   transports: [
//     new winston.transports.File({
//       filename: `${logDir}/error.log`,
//       level: "error",
//     }),
//     new winston.transports.File({
//       filename: `${logDir}/combined.log`,
//     }),
//   ],
// });

// if (process.env.NODE_ENV !== "production") {
//   logger.add(new winston.transports.Console());
// }

// module.exports = logger;



const winston = require("winston");
const path = require("path");
const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// Ensure logs directory exists
const fs = require('fs');
const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Custom format for console output
const consoleFormat = printf(({ level, message, timestamp, ...meta }) => {
  const ts = timestamp.slice(0, 19).replace('T', ' ');
  
  // Handle HTTP request logs
  if (meta.method && meta.url) {
    const { method, url, status, responseTime, ip } = meta;
    
    // Format similar to: info: GET /v1/doctor/homedetails 200 - 1265.030 ms
    let logMessage = `${level}: ${method} ${url} ${status}`;
    
    if (responseTime) {
      logMessage += ` - ${parseFloat(responseTime).toFixed(3)} ms`;
    }
    
    return logMessage;
  }
  
  // Handle error messages
  if (meta.stack) {
    return `${level}: ${message}\n${meta.stack}`;
  }
  
  // Handle regular messages
  if (typeof message === 'object') {
    return `${level}: ${JSON.stringify(message)}`;
  }
  
  return `${level}: ${message}`;
});

// Custom HTTP format for file logs
const httpFormat = printf(({ level, message, timestamp, ...meta }) => {
  const ts = timestamp.slice(0, 19).replace('T', ' ');
  
  if (meta.method && meta.url) {
    return `${ts} ${level.toUpperCase()}: ${meta.method} ${meta.url} ${meta.status} - ${meta.responseTime || 0}ms - ${meta.ip || 'N/A'}`;
  }
  
  return `${ts} ${level.toUpperCase()}: ${message}`;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    json()
  ),
  transports: [
    // Error logs (file)
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        json()
      )
    }),
    
    // Combined logs (file)
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json()
      )
    }),
    
    // HTTP access logs (file)
    new winston.transports.File({
      filename: path.join(logDir, 'access.log'),
      level: 'http',
      format: httpFormat
    })
  ],
});

// Console transport with colored output
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: combine(
      colorize(),
      consoleFormat
    )
  }));
}

// Helper to log HTTP requests
logger.logRequest = (req, res, responseTime) => {
  const meta = {
    method: req.method,
    url: req.originalUrl || req.url,
    status: res.statusCode,
    ip: req.ip || req.connection.remoteAddress || req.socket.remoteAddress,
    userAgent: req.get('user-agent'),
    responseTime: responseTime
  };
  
  // Determine log level based on status code
  let level = 'info';
  if (meta.status >= 500) level = 'error';
  else if (meta.status >= 400) level = 'warn';
  else if (meta.status >= 300) level = 'http';
  
  logger.log(level, 'HTTP Request', meta);
};

// Create a stream for morgan (if using)
logger.stream = {
  write: (message) => {
    // Parse morgan format: :method :url :status :response-time ms - :res[content-length]
    const parts = message.trim().split(' ');
    if (parts.length >= 5) {
      const meta = {
        method: parts[0],
        url: parts[1],
        status: parseInt(parts[2]),
        responseTime: parts[3],
        contentLength: parts[6] || '0'
      };
      logger.log('http', 'HTTP Request', meta);
    } else {
      logger.info(message.trim());
    }
  }
};

module.exports = logger;