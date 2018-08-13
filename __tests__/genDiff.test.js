import fs from 'fs';
import genDiff from '../src';

test('gendiff', () => {
  const pathToTestFile = './__tests__/__fixtures__/';
  const pathToFile1 = `${pathToTestFile}before.json`;
  const pathToFile2 = `${pathToTestFile}after.json`;
  const result = fs.readFileSync(`${pathToTestFile}result.txt`, 'utf8');
  expect(genDiff(pathToFile1, pathToFile2))
    .toBe(result);
});
