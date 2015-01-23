var debug = require('debug');
var fs = require('fs');
var path = require('path');

findPkgJson = function (dir) {

  var files = fs.readdirSync(dir);
  
  if (~files.indexOf('package.json')) {
    return path.join(dir, 'package.json');
  }
  
  if (dir === '/') {
    throw new Error('Could not find package.json up from: ' + dir);
  }
  else if (!dir || dir === '.') {
    throw new Error('Cannot find package.json from unspecified directory');
  }
  
  return findPkgJson(path.dirname(dir));
};

var pkgJson = findPkgJson(process.cwd()), version;

if (pkgJson) {
  version = require(pkgJson).version;
}

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
      var args = Array.prototype.slice.call(arguments, 0);
      var obj = typeof args[0] === 'object' ? args[0] : {};
      if (process.domain && process.domain.correlationId) {
        obj.correlationId = process.domain.correlationId;
      }
      if (version) {
        obj.version = version;
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