load-test:
	time node ./test/load-test.js >> /dev/null

test:
	echo "removing optional dependencies"
	rm -rf ./node_modules/bunyan ./node_modules/pino
	echo "testing debug mode"
	./test/test
	npm i pino node-jq 2> /dev/null
	echo "testing pino mode with string LOG_LEVEL"
	LOG_LEVEL=debug ./test/test | ./node_modules/node-jq/bin/jq
	echo "testing pino mode with numerical LOG_LEVEL"
	LOG_LEVEL=10 ./test/test | ./node_modules/node-jq/bin/jq
	rm -rf ./node_modules/pino
	echo "testing bunyan mode"
	npm i bunyan 2> /dev/null && LOG_LEVEL=10 ./test/test | ./node_modules/.bin/bunyan

.PHONY: test
