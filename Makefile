install: 
	npm install

lint:
	npm run eslint

start:
	npm run babel-node -- src/bin/gendiff.js  ./__tests__/__fixtures__/flatFiles/before.json  ./__tests__/__fixtures__/flatFiles/after.json 

publish:
	npm publish

test: 
	npm test

test-watch:
	npm run test:watch

.PHONY: test