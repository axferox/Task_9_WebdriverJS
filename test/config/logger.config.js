const winston = require("winston");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, prettyPrint, simple, logstash, json, printf } = format;

const logger = winston.createLogger({
  level: "info",
  format: combine(simple()),
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "test/logs/error.logger.log", level: "error" }),
    new winston.transports.File({ filename: "test/logs/combined.logger.log", level: "debug" }),
  ],
});

module.exports = {
  logger,
};
