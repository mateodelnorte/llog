llog
====

[![Greenkeeper badge](https://badges.greenkeeper.io/mateodelnorte/llog.svg)](https://greenkeeper.io/)

llog is a simple logging module. llog is intended for use in applications, not libraries. It provides level-based debugging (trace|debug|info|warn|error|fatal). `note: For adding detailed debug statements in libraries, use TJ's `debug` module.`

As an added bonus, llog provides a simple upgrade path from plain text to json logging via either pino or bunyan. `llog` will look for `pino` or `bunyan` at load time and automatically use them as a provider if present. This means you can write your apps with non-json logging when starting, and auto-magically all your logs to json logging with a simple `npm i --save pino`. 

## level-based debugging

To use llog:

```
var log = require('llog');

log.debug('some info'); // prints 'debug some info' to stdout
log.info('some info'); // prints 'info some info' to stdout
log.warn('some info'); // prints 'warn some info' to stdout
log.error('some error'); // prints 'error some error' to stdout
```

## Specifying log levels

llog is based on debug, and as such extends the same mechanism debug uses to specify which items to log - using `process.env.DEBUG`. 

To log only info, warn, and error in llog, for instance, you would run your application similar to the following:

```
DEBUG=info,warn,error node app.js
```

Adding trace is simple: 

```
DEBUG=trace,info,warn,error node app.js
```

## Magic upgrade to json logging

llog will automatically detect if `bunyan` or `pino` are installed as a peer dependency and, if so, automatically upgrade to json logging. Because `bunyan` and `pino` use `process.env.LOG_LEVEL` as a level indicator (as opposed to `debug`'s `DEBUG` variable, the steps for moving to json logs are: 

1. `npm install --save buynan` or `npm install --save pino`
2. execute your application using `LOG_LEVEL=10 node app` instead of using `DEBUG`. Higher levels are always included when specifying a level. 

Bunyan log levels can be found at https://github.com/trentm/node-bunyan#levels. 
Pino log levels can be found at https://github.com/pinojs/pino

This is particularly useful when moving from early stages of application development to having unified logging via Logstash or Splunk. 
