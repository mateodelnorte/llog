test:
	./test/test
	./test/test | ./node_modules/.bin/bunyan 

.PHONY: test