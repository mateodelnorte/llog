load-test:
	time node ./test/load-test.js >> /dev/null

test:
	echo "removing optional dependencies"
	rm -rf ./node_modules/bunyan ./node_modules/pino
	echo "testing debug mode"
	./test/test
	npm i pino node-jq --no-save
	echo "testing pino mode with string LOG_LEVEL"
	LOG_LEVEL=debug ./test/test
	echo "testing pino mode with numerical LOG_LEVEL"
	LOG_LEVEL=10 ./test/test
	rm -rf ./node_modules/pino
	echo "testing bunyan mode"
	npm i bunyan --no-save
	LOG_LEVEL=10 ./test/test | ./node_modules/.bin/bunyan

.PHONY: test
