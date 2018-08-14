import fs from 'fs';
import genDiff from '../src';

const pathToTestFile = './__tests__/__fixtures__/';
const pathToResultFile = `${pathToTestFile}result.txt`;
const result = fs.readFileSync(pathToResultFile, 'utf8');


test('.json', () => {
  const pathToFile1 = `${pathToTestFile}before.json`;
  const pathToFile2 = `${pathToTestFile}after.json`;
  expect(genDiff(pathToFile1, pathToFile2))
    .toBe(result);
});

test('.yml', () => {
  const pathToFile1 = `${pathToTestFile}before.yml`;
  const pathToFile2 = `${pathToTestFile}after.yml`;
  expect(genDiff(pathToFile1, pathToFile2))
    .toBe(result);
});

test('.ini', () => {
  const pathToFile1 = `${pathToTestFile}before.ini`;
  const pathToFile2 = `${pathToTestFile}after.ini`;
  expect(genDiff(pathToFile1, pathToFile2))
    .toBe(result);
});
