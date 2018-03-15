const options = Number.isNaN(process.env.LOG_LEVEL) ?
  { level: process.env.LOG_LEVEL } :
  { levelVal: process.env.LOG_LEVEL };

module.exports = require('pino')(options);
