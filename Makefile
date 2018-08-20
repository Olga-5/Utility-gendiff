install: 
	npm install

lint:
	npm run eslint

start:
	npm run babel-node -- src/bin/gendiff.js -f json ./__tests__/__fixtures__/treeFiles/before.json  ./__tests__/__fixtures__/treeFiles/after.json 

publish:
	npm publish

test: 
	npm test

test-watch:
	npm run test:watch

.PHONY: test