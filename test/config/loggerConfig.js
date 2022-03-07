const winston = require('winston');
const { format } = require('winston');

const { combine, simple } = format;

const logger = winston.createLogger({
  exitOnError: false,
  level: 'info',
  format: combine(simple()),
  transports: [
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.File({ level: 'error', filename: 'test/logs/errorLogger.log' }),
    new winston.transports.File({ level: 'debug', filename: 'test/logs/combinedLogger.log' }),
  ],
});

module.exports = {
  logger,
};
