install: 
	npm install

lint:
	npm run eslint

start:
	npm run babel-node -- src/bin/gendiff.js

publish:
	npm publish
