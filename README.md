llog
====

llog is a simple logging module. I've re-written this module into so many of my applications, it became obvious it was time to publish and reuse. 

To use llog:

```
var log = require('llog');

log.debug('some info'); // prints 'debug some info' to stdout
log.info('some info'); // prints 'info some info' to stdout
log.warn('some info'); // prints 'warn some info' to stdout
log.error('some error'); // prints 'error some error' to stdout
```
