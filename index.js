var debug = require('debug');
var path = require('path');

var bunyan;

try {
  bunyan = require('bunyan');
} catch (err) {
  bunyan = null;
}

function setLogger (name) {
  var logger = bunyan.createLogger({ name: name });
  logger.level(0);
  module.exports = logger;
  module.exports.setServiceName = function (name) {
    setLogger(name);
  };
}

if (bunyan) {
  setLogger(path.basename(process.argv[1]));
} else {
  var levels = ['debug', 'info', 'warn', 'error'];

  levels.forEach(function (level) {
    module.exports[level] = debug(level);
  });  
}