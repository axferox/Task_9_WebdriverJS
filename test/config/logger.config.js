const winston = require("winston");
const { format, transports } = require("winston");
const { combine, simple} = format;

const logger = winston.createLogger({
  level: "info",
  format: combine(simple()),
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "test/logs/error.logger.log", handleRejections: true, level: "error" }),
    new winston.transports.File({ filename: "test/logs/combined.logger.log", handleRejections: true, level: "debug" }),
  ],
});

logger.exceptions.handle(new transports.File({ filename: "test/logs/error.logger.log" }));
logger.rejections.handle(new transports.File({ filename: "test/logs/combined.logger.log" }));

module.exports = {
  logger,
};
