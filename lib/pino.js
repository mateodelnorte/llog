const debug = require('debug')('llog:pino');

var level = process.env.LOG_LEVEL;

let int = null;

try {
  int = parseInt(level);
} catch (error) {
  // no op. assume level is already a standard word
}

if (int !== null) {
  const map = {
    10: 'trace',
    20: 'debug',
    30: 'info',
    40: 'warn',
    50: 'error',
    60: 'fatal',
  }
  level = map[int] || 20;
}

debug(`pino log level set to ${level}`);

module.exports = require('pino')({ level: level });
