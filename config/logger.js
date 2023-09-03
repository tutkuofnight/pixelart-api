const winston = require("winston")

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "logs/info.log",
    }),
    new winston.transports.File({
      level: "debug",
      filename: "logs/debug.log",
    }),
    new winston.transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
  ],
})

module.exports = logger