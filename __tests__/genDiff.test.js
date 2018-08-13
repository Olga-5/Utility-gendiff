import fs from 'fs';
import genDiff from '../src';

test('gendiff', () => {
  const pathToTestFile = './__tests__/__fixtures__/';
  const result = fs.readFileSync(`${pathToTestFile}result.txt`, 'utf8');
  expect(genDiff(`${pathToTestFile}before.json`, `${pathToTestFile}after.json`))
    .toBe(result);
});
