var log = require('../');

for (var i = 0; i < 1000; i++) {
  log.debug('test %s', 'value');
  log.info('test %s', 'value');
  log.warn('test %s', 'value');
}
