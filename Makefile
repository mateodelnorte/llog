test:
	./test/test
	./test/test | ./node_modules/.bin/bunyan -o short

.PHONY: test