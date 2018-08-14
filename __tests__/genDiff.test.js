import fs from 'fs';
import genDiff from '../src';

const pathToTestFile = './__tests__/__fixtures__/';
const pathToResultFile = `${pathToTestFile}result.txt`;

test('json', () => {
  const pathToFile1 = `${pathToTestFile}before.json`;
  const pathToFile2 = `${pathToTestFile}after.json`;
  const result = fs.readFileSync(pathToResultFile, 'utf8');
  expect(genDiff(pathToFile1, pathToFile2))
    .toBe(result);
});

test('yml', () => {
  const pathToFile1 = `${pathToTestFile}before.yml`;
  const pathToFile2 = `${pathToTestFile}after.yml`;
  const result = fs.readFileSync(pathToResultFile, 'utf8');
  expect(genDiff(pathToFile1, pathToFile2))
    .toBe(result);
});
