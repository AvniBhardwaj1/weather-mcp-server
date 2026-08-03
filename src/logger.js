const { createLogger, transports, format } = require('winston');

const level = process.env.LOG_LEVEL || 'info';
const logger = createLogger({
  level,
  format: format.combine(format.timestamp(), format.errors({ stack: true }), format.splat(), format.json()),
  transports: [new transports.Console({ format: format.combine(format.colorize(), format.simple()) })]
});

module.exports = logger;