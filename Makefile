load-test:
	time node ./test/load-test.js >> /dev/null

test:
	./test/test
	./test/test | ./node_modules/.bin/bunyan 

.PHONY: test
