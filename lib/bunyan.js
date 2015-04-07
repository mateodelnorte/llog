var bunyan = require('bunyan');
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

function setLogger (name) {
  var logger = bunyan.createLogger({ name: name });
  
  logger.level(0);

  var levels = {
    fatal:  60,
    error:  50,
    warn:   40,
    info:   30,
    debug:  20,
    trace:  10,
  };

  Object.keys(levels).forEach(function (level) {

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

    if (levels[level] > LOG_LEVEL) {
      logger[level] = _getCorrelationId;
    } else {
      logger[level] = function () { /* no op for performance */ };
    }

  });

  module.exports = logger;
  module.exports.setServiceName = function (name) {
    setLogger(name);
  };
}

var title = path.basename(process.title) !== 'node' ? process.title : path.basename(process.argv[1]);

var LOG_LEVEL;

try {
  LOG_LEVEL = parseInt(process.env.LOG_LEVEL);
  if (isNaN(LOG_LEVEL)) LOG_LEVEL = 0;
  if (LOG_LEVEL === undefined || LOG_LEVEL === null) LOG_LEVEL = 0;
} catch (e) {
  LOG_LEVEL = 0; 
}

var pkgJson = findPkgJson(process.cwd()), version;

if (pkgJson) {
  version = require(pkgJson).version;
}

setLogger(title);