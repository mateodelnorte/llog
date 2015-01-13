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

  var levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal' ];

  levels.forEach(function (level) {

    var fn = logger[level].bind(logger);

    function _getCorrelationId () {
      var args = Array.prototype.slice(arguments);
      var obj = typeof args[0] === 'object' ? args[0] : {};
      if (process.domain && process.domain.correlationId) {
        obj.correlationId = process.domain.correlationId;
      }
      if (typeof args[0] === 'object') {
        args[0] = obj;
      } else {
        args.unshift(obj);
      }
      fn.apply(logger, args);
    }

    logger[level] = _getCorrelationId;

  });

  module.exports = logger;
  module.exports.setServiceName = function (name) {
    setLogger(name);
  };
}

if (bunyan) {
  setLogger(path.basename(process.title !== 'node' ? process.title : process.argv[1]));
} else {
  var levels = ['debug', 'info', 'warn', 'error'];

  levels.forEach(function (level) {
    module.exports[level] = debug(level);
  });  
}