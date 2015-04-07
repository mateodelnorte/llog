var debug = require('debug');

var levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

levels.forEach(function (level) {
  module.exports[level] = debug(level);
});