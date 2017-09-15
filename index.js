var bunyan, pino;

try {
  pino = require('pino');
} catch (err) {
  pino = null;
}

try {
  bunyan = require('bunyan');
} catch (err) {
  bunyan = null;
}

if (pino) {
  module.exports = require('./lib/pino');
} else if (bunyan) {
  module.exports = require('./lib/bunyan');
} else {
  module.exports = require('./lib/debug');
}