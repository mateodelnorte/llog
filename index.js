var bunyan;

try {
  bunyan = require('bunyan');
} catch (err) {
  bunyan = null;
}

if (bunyan) {
  module.exports = require('./lib/bunyan'); 
} else {
  module.exports = require('./lib/debug');
}