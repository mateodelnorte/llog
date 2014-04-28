var debug = require('debug');

var levels = ['debug', 'info', 'warn', 'error'];

levels.forEach(function (level) {
	module.exports[level] = debug(level);
});
