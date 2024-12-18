const { createLogger, transports, format } = require('winston');
const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    label({ label: 'SERVER' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        myFormat
      )
    }),
    new transports.File({ 
      filename: './logs/app.log', 
      maxsize: 5242880,
      maxFiles: 5,
      format: myFormat
    })
  ],
  exceptionHandlers: [
    new transports.File({ filename: './logs/exceptions.log' })
  ],
  rejectionHandlers: [
    new transports.File({ filename: './logs/rejections.log' })
  ]
});

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

module.exports = logger;
